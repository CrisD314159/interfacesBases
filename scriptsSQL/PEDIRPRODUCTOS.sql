
--- Mecanísmo para que un vendedor pida productos

CREATE SEQUENCE seq_detalleinventario
  START WITH 7
    INCREMENT BY 1;

execute llenarInventario(11, 20, 1);


CREATE OR REPLACE PROCEDURE llenarInventario(
    id_vendedor VENDEDOR.ID%TYPE, 
    cantidad DETALLEINVENTARIO.CANTIDAD%TYPE, 
    idproducto DETALLEINVENTARIO.ID_PRODUCTO%TYPE,
    v_returnValue OUT NUMBER
) AS
    v_inventarioVendedor INVENTARIO%ROWTYPE;
    v_nuevaCantidad DETALLEINVENTARIO.CANTIDAD%TYPE;
    v_detalleInventario DETALLEINVENTARIO%ROWTYPE;
    v_cantidadStockProducto PRODUCTO.STOCK%TYPE;  -- Asegúrate de que el tipo de 'PRODUCTO' sea correcto

BEGIN
    -- Verifica que el vendedor y el producto existan
    IF existeVendedor(id_vendedor) <> 1 OR existeProducto(idproducto) <> 1 THEN
        RAISE_APPLICATION_ERROR(-20008, 'El vendedor o el producto no existen');
    END IF;
 
    -- Obtener inventario del vendedor
    SELECT * INTO v_inventarioVendedor FROM INVENTARIO WHERE VENDEDOR = id_vendedor;
 
    -- Obtener stock del producto
    SELECT STOCK INTO v_cantidadStockProducto FROM PRODUCTO WHERE ID = idproducto;
 
    -- Verificar si hay suficiente stock
    IF cantidad > v_cantidadStockProducto THEN
        RAISE_APPLICATION_ERROR(-20009, 'No hay stock suficiente para la petición');
    END IF;
 
    -- Si existe el detalle, actualiza la cantidad
    IF existeDetalle(id_vendedor, idproducto) = 1 THEN
           SELECT D.ID, D.Descripción, D.Cantidad, D.Fecha_ult_actualizacion, D.id_producto, D.Inventario INTO v_detalleInventario FROM DETALLEINVENTARIO D
            JOIN INVENTARIO I ON D.INVENTARIO = I.ID
            WHERE I.VENDEDOR = id_vendedor AND D.ID_PRODUCTO = idproducto;
        v_nuevaCantidad := v_detalleInventario.CANTIDAD + cantidad;
        UPDATE DETALLEINVENTARIO SET CANTIDAD = v_nuevaCantidad WHERE ID = v_detalleInventario.ID;
        UPDATE DETALLEINVENTARIO SET Fecha_ult_actualizacion = SYSDATE WHERE ID = v_detalleInventario.ID;
        UPDATE PRODUCTO SET STOCK = STOCK - cantidad WHERE ID = idproducto;
    
    -- Si no existe el detalle, inserta un nuevo registro
    ELSIF existeDetalle(id_vendedor, idproducto) = 0 THEN
        INSERT INTO DETALLEINVENTARIO (ID, Descripción, CANTIDAD, Fecha_ult_actualizacion, ID_PRODUCTO, INVENTARIO)
        VALUES (SEQ_DETALLEINVENTARIO.NEXTVAL, 'Stock inicial', cantidad, SYSDATE, idproducto, v_inventarioVendedor.ID);
        UPDATE PRODUCTO SET STOCK = STOCK - cantidad WHERE ID = idproducto;
    END IF;
    
    v_returnValue := 1;

    COMMIT;  -- Asegúrate de hacer commit al final para guardar los cambios
    
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;  -- Revertir cambios en caso de error
        RAISE;  -- Re-lanzar el error para que se pueda manejar fuera
END;


CREATE OR REPLACE FUNCTION existeDetalle(
    id_vendedor VENDEDOR.ID%TYPE, producto PRODUCTO.ID%TYPE
) RETURN NUMBER AS
    v_detalleInventario DETALLEINVENTARIO%ROWTYPE;
BEGIN
    SELECT D.ID, D.Descripción, D.Cantidad, D.Fecha_ult_actualizacion, D.id_producto, D.Inventario INTO v_detalleInventario FROM DETALLEINVENTARIO D
    JOIN INVENTARIO I ON D.INVENTARIO = I.ID
    WHERE I.VENDEDOR = id_vendedor AND D.ID_PRODUCTO = producto;
    RETURN 1;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN 0;
END;

CREATE OR REPLACE FUNCTION existeProducto(
    producto PRODUCTO.ID%TYPE
) RETURN NUMBER AS
    v_count NUMBER; -- Variable para contar las filas encontradas
BEGIN
    -- Contamos cuántos productos coinciden con el ID proporcionado
    SELECT COUNT(*) INTO v_count
    FROM PRODUCTO
    WHERE ID = producto;

    -- Si se encontró al menos un producto, retornamos 1
    IF v_count > 0 THEN
        RETURN 1;
    ELSE
        RETURN 0;
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        -- Manejo de excepciones para cualquier error no esperado
        RETURN 0;
END;