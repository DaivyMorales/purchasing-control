import { alertContext } from "@/context/AlertContext";
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { productContext } from "@/context/ProductContext";

interface IProductSchema {
  PRODUCTO: string;
  NOMBRE: string;
  PRESENTACION: number;
}

export default function ProductsForm() {
  const { showAlert, setShowAlert } = useContext(alertContext);
  const { products, setProducts, createProduct } = useContext(productContext);

  const [product, setProduct] = useState<IProductSchema>({
    PRODUCTO: "",
    NOMBRE: "",
    PRESENTACION: 0,
  });

  const formik = useFormik({
    initialValues: { product },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      createProduct(values);
      resetForm();
    },
  });

  return (
    <motion.div
      // initial={{ opacity: 0, scale: 0.6 }}
      // animate={{ opacity: 1, scale: 1 }}
      className="alertBox "
      style={showAlert ? { visibility: "visible" } : { visibility: "hidden" }}
    >
      <h2>Crear producto</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-y-3 ">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="PRODUCTO">Producto</label>
            <input
              type="text"
              className="inputForm"
              placeholder="Ej: APA"
              name="PRODUCTO"
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="NOMBRE">Nombre</label>
            <input
              type="text"
              className="inputForm"
              placeholder="Ej: APA 25KG"
              name="NOMBRE"
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="PRESENTACION">Presentacion</label>
            <input
              type="number"
              className="inputForm"
              placeholder="25"
              name="PRESENTACION"
              onChange={formik.handleChange}
            />
          </div>
          <button type="submit" className="buttonSubmit">
            Crear
          </button>
        </div>
      </form>
    </motion.div>
  );
}
