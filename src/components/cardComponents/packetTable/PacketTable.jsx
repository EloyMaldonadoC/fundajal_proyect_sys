"use client"
import React, { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

import PacketHeader from "./PacketHeader";
import PacketRow from "./PacketRow";
import PacketFooter from "./PacketFooter";
 
function PacketTable({ buscar }) {

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");

  const [packets, setPackets] = useState(null);

  useEffect(() => {
    fetch('/api/paquetes').then((response) => {
      if(!response.ok) {
        return
      }
      return response.json();
    }).then((data) => {
      setPackets(data);
      console.log(data);
    }).catch((error) => {
      setError(error);
      setLoading(false);
    })
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <PacketHeader />
      {packets && (
        <>
          {packets.map((packet, index) => (
            <div key={index}>
              {packet.pa_nombre.toLowerCase().includes(buscar.toLowerCase()) && (
                <PacketRow key={packet.pa_id} packet={packet}/>
              )}
            </div>
          ))}
        </>
      )}
      <PacketFooter />
    </div>
  );
}

export default PacketTable;
