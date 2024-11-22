import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
interface AlertDialogSectionProps {
  children: React.ReactNode;
  title: string;
  description: string;
  cancelButtonContent: string;
  actionButtonContent: string;
  handleCancel?: () => void;
  handleAction: () => void;
}
export function AlertDialogSection({
  children,
  title,
  description,
  cancelButtonContent,
  actionButtonContent,
  handleCancel = () => {},
  handleAction,
}: AlertDialogSectionProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {cancelButtonContent}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>
            {actionButtonContent}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
