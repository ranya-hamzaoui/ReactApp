
import React from 'react';
import { useParams } from 'react-router-dom'; // Importer useParams
import { useQuery } from '@tanstack/react-query'; // Importer useQuery

const fetchUser = async (id: string) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des données utilisateur');
  }
  return response.json();
};

const UserDetail = () => {
  const { id } = useParams();
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['user', id], // Clé unique pour cette requête
    queryFn:() => fetchUser(id!), // Fonction qui effectue la récupération des données
    enabled: !!id
});

  // Si les données sont en train de charger
  if (isLoading) {
    return <div>Chargement de données...</div>;
  }
  // Si une erreur se produit
  if (isError) {
    return <div className="text-danger">Erreur : {error instanceof Error ? error.message : 'Une erreur est survenue'}</div>;
  }
  // Si les données sont récupérées avec succès
  return (
    <div>
      <h1>Détail de l'utilisateur</h1>
      <div className="card bg-dark text-white px-5">
        <h2>{user.username}</h2>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserDetail;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom'; // Importer useParams

// const UserDetail = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true); // Ajout d'un état de chargement
//   const [error, setError] = useState<string | null>(null); // Gestion des erreurs

//   // Utilisation d'un effet pour récupérer les données de l'utilisateur
//   useEffect(() => {
//     const fetchUser = async () => {
//       setLoading(true); // Début de chargement
//       setError(null); // Réinitialisation de l'erreur
//       try {
//         const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//         if (!response.ok) {
//           throw new Error('Erreur lors de la récupération des données utilisateur');
//         }
//         const data = await response.json();
//         setUser(data); // Mise à jour des données utilisateur
//       } catch (err: any) {
//         setError(err.message); // Gestion des erreurs
//       } finally {
//         setLoading(false); // Fin de chargement
//       }
//     };

//     if (id) {
//       fetchUser();
//     }
//   }, [id]);

//   // Si l'utilisateur n'est pas encore chargé, afficher un message de chargement
//   if (loading) {
//     return <div>Chargement de données...</div>;
//   }

//   // Si une erreur s'est produite lors de la récupération des données
//   if (error) {
//     return <div className="text-danger">Erreur : {error}</div>;
//   }

//   // Si l'utilisateur est chargé, afficher ses détails
//   return (
//     <div>
//       <h1>Détail de l'utilisateur</h1>
//       <div className="card bg-dark text-white px-5">
//         <h2>{user.username}</h2>
//         <p>{user.email}</p>
//       </div>
//     </div>
//   );
// };

// export default UserDetail;
