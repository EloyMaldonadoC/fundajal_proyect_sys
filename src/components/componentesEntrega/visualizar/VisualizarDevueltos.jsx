import React from 'react'
import styles from './module/VisualizarDevueltos.module.css'
import { Button } from '@/components/input/InputComponents'

function VisualizarDevueltos({productos, paquetes, edicion, deshacer}) {
  return (
    <div>
      <div className={styles.header}>
        <h3>Devoluciones</h3>
      </div>
      <div className={styles.titulo}>
        <h4 className={styles.nombre}>Nombre</h4>
        <h4 className={styles.cantidad}>cantidad</h4>
      </div>
        {paquetes && (
          <>
            {paquetes.length != 0 && (
              <>
                {paquetes.map((paquete, index) => paquete.en_pa_estado == "devuelto" && (
                  <div key={index} className={styles.container}>
                    <div className={styles.nombre}>{paquete.pa_nombre}</div>
                    <div className={styles.cantidad}>{paquete.en_pa_cantidad}</div>
                    <div className={styles.deshacer}>
                      {edicion && (
                        <Button text={"deshacer"} type={"cancelar"} onPress={() => {deshacer(paquete)}}/>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
        {productos && (
          <>
            {productos.length != 0 && (
              <>
                {productos.map((producto, index) => producto.en_produc_estado == "devuelto" && (
                  <div key={index} className={styles.container}>
                    <div className={styles.nombre}>{producto.produc_nombre}</div>
                    <div className={styles.cantidad}>{producto.en_produc_cantidad}</div>
                    <div className={styles.deshacer}>
                      {edicion && (
                        <Button text={"deshacer"} type={"cancelar"} onPress={() => {deshacer(producto)}}/>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      <div className={styles.fooder}/>
    </div>
  )
}

export default VisualizarDevueltos