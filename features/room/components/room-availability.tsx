/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, addMonths, parseISO, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import RestClient from "@/features/room/utils/api-function";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const RoomAvailability = ({ typeId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restClient = new RestClient();

    const fetchAvailability = async () => {
      const startDate = format(currentDate, "yyyy-MM-01");
      const endDate = format(addMonths(currentDate, 1), "yyyy-MM-dd");

      setIsLoading(true);
      try {
        console.log("Fetching availability with:", { typeId, startDate, endDate });

        const { data } = await restClient
          .service("rooms/room-availability")
          .find({
            typeId,
            startDate,
            endDate,
          });

        console.log("API response:", data);

        if (!data || !data.availableSlots) {
          throw new Error("No data or availableSlots in response.");
        }

        const availableSlots = data?.availableSlots || [];
        const notAvailableSlots = data?.notAvailableSlots || [];

        const availableEvents = availableSlots.map((date: string, index: any) => ({
          id: `available-${index}`,
          start: parseISO(date),
          end: parseISO(date),
          title: "Available",
        }));

        const notAvailableEvents = notAvailableSlots.map((date: string, index: any) => ({
          id: `not-available-${index}`,
          start: parseISO(date),
          end: parseISO(date), 
          title: "Not Available",
        }));

        setEvents([...availableEvents, ...notAvailableEvents]);
        setError("");
      } catch (err) {
        console.error("Error fetching room availability:", err);
        setError("Unable to fetch room availability. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
  }, [currentDate, typeId]);

  return (
    <div className="room-availability">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          onNavigate={(date: React.SetStateAction<Date>) => setCurrentDate(date)}
          defaultView="week"
          views={["month", "week", "day"]}
          step={60}
          timeslots={1}
          style={{ height: 600 }}
          eventPropGetter={(event: { title: string; }) => ({
            style: {
              backgroundColor:
                event.title === "Available" ? "#b3e5fc" : "#ffcdd2",
              color: event.title === "Available" ? "#0288d1" : "#d32f2f",
            },
          })}
        />
      )}
      <div className="flex justify-center mt-4">
        <div className="flex items-center mr-4">
          <span className="w-3 h-3 rounded-full bg-blue-300 inline-block mr-1"></span>{" "}
          Available
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-red-200 inline-block mr-1"></span>{" "}
          Not Available
        </div>
      </div>
    </div>
  );
};


export default RoomAvailability;
