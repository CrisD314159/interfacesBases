-- CREACION DE LAS SECUENCIAS PARA LA COMPRA

-- Mecanismo de hacer una compra
CREATE SEQUENCE seq_venta
  START WITH 7
    INCREMENT BY 1;

CREATE SEQUENCE seq_detalleVenta
  START WITH 7
    INCREMENT BY 1;

CREATE SEQUENCE seq_envio
  START WITH 7
    INCREMENT BY 1;

CREATE SEQUENCE seq_comision
  START WITH 7
    INCREMENT BY 1;

Select * from producto;

declare
    v_response Number;
begin
crearCompra(1092850502, 2, 30, 523124421, 'calle 3 #23-12', 3, v_response);

select * from vendedor;

select * from inventario;

dbms_output.put_line(v_response);

end;

    SELECT D.ID, D.Descripción, D.Cantidad, D.Fecha_ult_actualizacion, D.id_producto, D.Inventario FROM DETALLEINVENTARIO D
        JOIN INVENTARIO I ON I.ID = D.INVENTARIO
        WHERE I.VENDEDOR = 1092850502 AND d.ID_PRODUCTO = 2
         FETCH FIRST 1 ROWS ONLY;


--FUNCION QUE PERMITE REALIZAR UNA COMPRA
CREATE OR REPLACE PROCEDURE crearCompra(
    id_vendedor IN VENDEDOR.ID%TYPE, id_producto IN PRODUCTO.ID%TYPE, cantidad_sol IN DETALLEVENTA.CANTIDAD%TYPE,
    id_comprador IN NUMBER, direccionEnvio IN Direccion.Descripción%TYPE, id_ciudad IN CIUDAD.ID%TYPE, v_returnValue OUT NUMBER
)AS
    v_stockProducto_inventario DETALLEINVENTARIO%ROWTYPE;
    v_valorProducto PRODUCTO.PRECIO%TYPE;
    v_idVenta NUMBER;
    v_idDetalleVenta NUMBER;
    v_envioResponse NUMBER;
    v_actualizarStockResponse NUMBER;
    v_comisionResponse NUMBER;
    
BEGIN
    IF existeVendedor(id_vendedor) != 1 THEN
        RAISE_APPLICATION_ERROR (-10001, 'EL VENDEDOR NO EXISTE');
    END IF;
    
    SELECT D.ID, D.Descripción, D.Cantidad, D.Fecha_ult_actualizacion, D.id_producto, D.Inventario INTO v_stockProducto_inventario FROM DETALLEINVENTARIO D
        JOIN INVENTARIO I ON I.ID = D.INVENTARIO
        WHERE I.VENDEDOR = id_vendedor AND d.ID_PRODUCTO = id_producto
        FETCH FIRST 1 ROWS ONLY;
    
        
     IF v_stockProducto_inventario.CANTIDAD < cantidad_sol THEN
        RAISE_APPLICATION_ERROR (-10003, 'NO HAY STOCK SUFICIENTE PARA EL PEDIDO');
    END IF;
    
    SELECT PRECIO INTO v_valorProducto FROM PRODUCTO WHERE ID = id_producto;
    
    v_idVenta := seq_venta.nextval;
    v_idDetalleVenta := seq_detalleVenta.NEXTVAL;
    
    INSERT INTO Venta (ID, Fecha_venta, Vendedor, Id_comprador) VALUES (v_idVenta, sysdate, id_vendedor, id_comprador);
    INSERT INTO DetalleVenta (ID, Producto, Cantidad, ValorUnitario, Venta) VALUES (v_idDetalleVenta, id_producto, cantidad_sol, v_valorProducto, v_idVenta);
    -- crear el envio
     crearEnvio(v_idVenta, direccionEnvio, id_ciudad, v_envioResponse );
    actualizarStock(v_stockProducto_inventario.ID, cantidad_sol, v_actualizarStockResponse);
    asignarComision(id_vendedor, v_valorProducto, v_idVenta, v_comisionResponse);
    
    IF v_envioResponse != 1 OR v_actualizarStockResponse != 1 OR v_comisionResponse != 1 THEN
        RAISE_APPLICATION_ERROR(-100007, 'Ocurrio un error en la creación de la venta');
    END IF;
    
    v_returnValue := 1;
    COMMIT;

END;







CREATE OR REPLACE FUNCTION existeVendedor (
 id_vendedor VENDEDOR.ID%TYPE
)RETURN NUMBER AS
v_returnValue NUMBER;
v_vendedor VENDEDOR%rowtype;

BEGIN
    SELECT * INTO v_vendedor FROM VENDEDOR WHERE ID = id_vendedor AND Estado = 1;
    RETURN 1;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN 0;
END;








CREATE OR REPLACE FUNCTION existeVenta (
 id_venta VENTA.ID%TYPE
)RETURN NUMBER AS
v_returnValue NUMBER;
v_venta VENTA%rowtype;

BEGIN
    SELECT * INTO v_venta FROM VENTA WHERE ID = id_venta;
    RETURN 1;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN 0;
END;











-- Función para crear el registro de comision

CREATE OR REPLACE PROCEDURE asignarComision (
   idVendedor VENDEDOR.ID%TYPE, cant_valor IN DETALLEVENTA.VALORUNITARIO%TYPE, id_venta VENTA.ID%TYPE,
   v_comisionResponse OUT NUMBER
)AS

CURSOR c_vendedores IS SELECT ID, NOMBRE, VENDEDOR_REFERIDO, NIVEL, ESTADO, Level
                        FROM VENDEDOR
                        START WITH ID = idVendedor   
                        CONNECT BY PRIOR VENDEDOR_REFERIDO = ID;
                        
v_valorComision Comision.ValorComision%TYPE;
v_idNivelVendedor VENDEDOR.NIVEL%TYPE;
v_nivelVendedor NIVEL%ROWTYPE;

BEGIN

    FOR r_vendedor IN c_vendedores LOOP
        SELECT NIVEL INTO v_idNivelVendedor FROM VENDEDOR WHERE ID = r_vendedor.ID;
        SELECT * INTO v_nivelVendedor FROM NIVEL WHERE ID = v_idNivelVendedor;
        IF r_vendedor.LEVEL = 1 THEN
            v_valorComision := (cant_valor * v_nivelVendedor.PorcentajeComision) / 100;
            INSERT INTO Comision (ID, Venta, Porcentaje, ValorComision, Vendedor) 
            VALUES (seq_comision.NEXTVAL, id_venta, v_nivelVendedor.PorcentajeComision, v_valorComision, r_vendedor.ID);
        ELSIF r_vendedor.LEVEL = 2 THEN
            v_valorComision := (cant_valor * v_nivelVendedor.PorcentajeComisionReferido) / 100;
            INSERT INTO Comision (ID, Venta, Porcentaje, ValorComision, Vendedor) 
            VALUES (seq_comision.NEXTVAL, id_venta, v_nivelVendedor.PorcentajeComisionReferido, v_valorComision, r_vendedor.ID);
        ELSIF r_vendedor.LEVEL > 2 THEN
            v_valorComision := (cant_valor * v_nivelVendedor.PorcentajeComisionNieto) / 100;
            INSERT INTO Comision (ID, Venta, Porcentaje, ValorComision, Vendedor) 
            VALUES (seq_comision.NEXTVAL, id_venta, v_nivelVendedor.PorcentajeComisionNieto, v_valorComision, r_vendedor.ID);
        END IF;
    
    END LOOP;

    v_comisionResponse := 1;


    
END;






DROP FUNCTION crearEnvio;

--- Función para Crear el registro de envio para el pedido

CREATE OR REPLACE PROCEDURE crearEnvio( --- Reeplazar por procedimiento
id_venta IN VENTA.ID%TYPE, desc_direccion IN DIRECCION.Descripción%TYPE, id_Ciudad IN Ciudad.ID%TYPE, v_envioResponse OUT NUMBER
) AS
    v_idDireccion NUMBER;
    BEGIN
        IF existeVenta(id_venta) != 1 THEN
            RAISE_APPLICATION_ERROR(-10006, 'La venta no existe');
        END IF;
        v_idDireccion := seq_direccion.nextval;
        INSERT INTO Direccion (ID, Descripción, Ciudad) VALUES (v_idDireccion, desc_direccion, id_Ciudad);
       INSERT INTO Envio (ID, Fecha_envio, Venta, Estado, Direccion) VALUES (seq_envio.nextval, sysdate, id_venta, 1, v_idDireccion);
       v_envioResponse := 1;

    
    END;
    
    
    
    
    
 

--- Función para actualizar la cantidad en stock delproducto en el inventario del vendedor
CREATE OR REPLACE PROCEDURE actualizarStock -- Cambiar por prcedimiento
(
    id_detalleInventario IN DETALLEINVENTARIO.ID%type,
    cantidad IN DETALLEINVENTARIO.CANTIDAD%type,
    v_actualizarStockResponse OUT NUMBER

)AS
    v_cantidadActual DETALLEINVENTARIO.CANTIDAD%TYPE;
    v_nuevaCantidad DETALLEINVENTARIO.CANTIDAD%TYPE;

BEGIN

    SELECT CANTIDAD INTO v_cantidadActual FROM DETALLEINVENTARIO WHERE ID = id_detalleInventario;
    v_nuevaCantidad := v_cantidadActual - cantidad;
    
    UPDATE DETALLEINVENTARIO set CANTIDAD = v_nuevaCantidad WHERE ID = id_detalleInventario;
    v_actualizarStockResponse := 1;


END;
