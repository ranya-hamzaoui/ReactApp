import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { User } from '../../interfaces/user';

interface TableProps<T> {
  headers: string[];                      // En-têtes de colonnes
  data: T[];                              // Données à afficher
  onEdit: (item: T) => void;              // Fonction à appeler pour l'édition
  onDelete: (id: string) => void;         // Fonction à appeler pour la suppression
  isPending: boolean;                     // Indicateur pour gérer le chargement
  renderRow: (item: T) => JSX.Element;    // Fonction de rendu d'une ligne
}

function TableComponent<T>({
  headers,
  data,
  onEdit,
  onDelete,
  isPending,
  renderRow,
}: TableProps<T>) {
  
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>{renderRow(item)}</tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableComponent;
