import React from 'react'
import CardEntregaPreview from '@/components/CardEntregaPreview'
import BannerDiario from '@/components/BannerDiario'

export default function page() {

  const fecha= [
    {
      dia: "Lunes 22",
      mes: "Julio",
      año: "2024"
    },
    {
      dia: "Martes 23",
      mes: "Julio",
      año: "2024"
    }
  ]

  return (
    <div>
      <BannerDiario dia={fecha[0].dia} mes={fecha[0].mes} año={fecha[0].año}/>
      <CardEntregaPreview/>
      <CardEntregaPreview/>
      <CardEntregaPreview/>
      <CardEntregaPreview/>
      <CardEntregaPreview/>
      <CardEntregaPreview/>
      <BannerDiario dia={fecha[1].dia} mes={fecha[1].mes} año={fecha[1].año}/>
      <CardEntregaPreview/>
      <CardEntregaPreview/>
      <CardEntregaPreview/>
      <CardEntregaPreview/>
      <CardEntregaPreview/>
      <CardEntregaPreview/>
    </div>
  )
}