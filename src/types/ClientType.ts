export type ClientType = {
   id?: number;
   title: string;
}

export interface ClientTableProps {
   updateTable: boolean;
   openDrawer: (clientId: number) => void;
}

export interface AddClientProps {
   isOpen: boolean;
   onCancel: () => void;
   addClient: (values: ClientTypes) => void;
}

export interface EditClientProps {
   isOpen: boolean;
   closeDrawer: () => void;
   selectedClientId: number | undefined;
   updateClient: (values: ClientTypes) => void;
}