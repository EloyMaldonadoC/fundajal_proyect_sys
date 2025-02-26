function createListProduct(productos, paquetes) {
  const productosMap = new Map();
  productos.forEach((producto) => {
    productosMap.set(producto.produc_id, {
      ...producto,
      en_es_produc_cant: Number(producto.en_produc_cantidad),
      en_es_produc_estado: producto.en_produc_estado,
    });
  });
  paquetes.forEach((producto) => {
    if (productosMap.has(producto.produc_id)) {
      const existingProduct = productosMap.get(producto.produc_id);
      existingProduct.en_es_produc_cant =
        Number(
          existingProduct.en_es_produc_cant
            ? existingProduct.en_es_produc_cant
            : 0
        ) + Number(producto.en_pa_cantidad ? producto.en_pa_cantidad : 0);
    } else {
      productosMap.set(producto.produc_id, {
        ...producto,
        en_es_produc_cant: producto.en_pa_cantidad,
        en_es_produc_estado: producto.en_pa_estado,
      });
    }
  });
  return [...productosMap.values()];
}

function changeStateOfProduct(listProducts, listContainer, id, cant, newState) {

  let finalList = []
  const existProduc = listContainer.find((product) => product.produc_id == id);

  const newList = listProducts.map((produc) =>
    produc.produc_id == id
      ? {
          ...produc,
          en_es_produc_cant: Number(produc.en_es_produc_cant) - Number(cant),
        }
      : produc
  );
  //Si el producto existe en la lista de contenido se sumara, si no, solo se agregara
  if (existProduc) {
    finalList = listContainer.map((produc) =>
      produc.produc_id == id
        ? {
            ...produc,
            en_es_produc_cant: Number(produc.en_es_produc_cant) + Number(cant),
          }
        : produc
    );
  } else {
    finalList = [
      ...listContainer,
      {
        existProduc,
        en_es_produc_cant: Number(cant),
        en_es_produc_estado: newState,
      },
    ];
  }
  return {newList, finalList}
}
function buscarProductosDeUnPaquete(listaProductos, paId, cant){
  const filtrarPaquete = listaProductos.filter((producto) => producto.pa_id == paId)
  console.log(filtrarPaquete);
}
export { createListProduct, changeStateOfProduct, buscarProductosDeUnPaquete };
