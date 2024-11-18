---- Concultas varias 

-- se trae todos los productos de vitalis pro
SELECT * FROM PRODUCTO;


-- se trae todos los vendedores que tienen stock de ese producto
SELECT v.ID AS vendedor_id, 
       v.NOMBRE AS vendedor_nombre, 
       di.CANTIDAD AS stock
FROM VENDEDOR v
JOIN INVENTARIO i ON v.ID = i.VENDEDOR
JOIN DETALLEINVENTARIO di ON i.ID = di.INVENTARIO
JOIN PRODUCTO p ON di.ID_PRODUCTO = p.ID
WHERE p.ID = 1
  AND di.CANTIDAD > 0;
  
-- traerse todos los productos en el inventario de un vendedor
SELECT * FROM DETALLEINVENTARIO DI
JOIN INVENTARIO I ON I.ID = DI.INVENTARIO
JOIN PRODUCTO P ON P.ID = DI.ID_PRODUCTO
WHERE I.VENDEDOR = 1765394;

-- Obtener todos los despachos o envios de un vendedor
SELECT e.ID AS envio_id,
       e.FECHA_ENVIO,
       ES.descripción,
       d.DESCRIPCIÓN AS direccion_descripcion,
       v.ID AS venta_id,
       p.NOMBRE AS producto_nombre,
       vendedor.ID AS vendedor_id,
       vendedor.NOMBRE AS vendedor_nombre
FROM ENVIO e
JOIN VENTA v ON e.VENTA = v.ID
JOIN EstadoEnvio ES ON ES.ID = e.estado
JOIN VENDEDOR vendedor ON v.VENDEDOR = vendedor.ID
JOIN DETALLEVENTA dv ON v.ID = dv.VENTA
JOIN PRODUCTO p ON dv.PRODUCTO = p.ID
JOIN DIRECCION d ON e.DIRECCION = d.ID
WHERE vendedor.ID = 1;




-- Obtener toda la información de un pedido o despacho (para el cliente)
SELECT E.ID AS ID_ENVIO, ES.DESCRIPCIÓN AS ESTADO, D.DESCRIPCIÓN AS DIRECCION, C.NOMBRE AS CIUDAD, E.FECHA_ENVIO AS FECHA, VEN.NOMBRE AS VENDEDOR
FROM ENVIO E
JOIN VENTA V ON V.ID = E.VENTA
JOIN DIRECCION D ON D.ID = E.DIRECCION
JOIN CIUDAD C ON C.ID = D.CIUDAD
JOIN EstadoEnvio ES ON ES.ID = E.ESTADO
JOIN VENDEDOR VEN ON VEN.ID = V.VENDEDOR
WHERE V.ID_COMPRADOR =1
;



-- Obtener toda la información de un pedido o despacho (para el vendedor)
SELECT E.ID AS ID_ENVIO, ES.DESCRIPCIÓN AS ESTADO, D.DESCRIPCIÓN AS DIRECCION, C.NOMBRE AS CIUDAD, E.FECHA_ENVIO AS FECHA, VEN.NOMBRE AS VENDEDOR
FROM ENVIO E
JOIN VENTA V ON V.ID = E.VENTA
JOIN DIRECCION D ON D.ID = E.DIRECCION
JOIN CIUDAD C ON C.ID = D.CIUDAD
JOIN EstadoEnvio ES ON ES.ID = E.ESTADO
JOIN VENDEDOR VEN ON VEN.ID = V.VENDEDOR
WHERE E.ID =1
;


-- metodo de login
CREATE OR REPLACE FUNCTION loginVendedor(
    p_correo IN VENDEDOR.EMAIL%TYPE,
    p_password IN VENDEDOR.PASSWORD%TYPE
) RETURN NUMBER IS
    v_id VENDEDOR.ID%TYPE;
BEGIN
    -- Intento de buscar el vendedor con el correo y la contraseña especificados
    SELECT ID INTO v_id
    FROM VENDEDOR
    WHERE EMAIL = p_correo
      AND PASSWORD = p_password
      AND Estado = 1;

    -- Si encuentra el registro, devuelve el ID del vendedor
    RETURN v_id;

EXCEPTION
    -- Si no encuentra el registro o ocurre un error, devuelve 0
    WHEN NO_DATA_FOUND THEN
        RETURN 0;
    WHEN OTHERS THEN
        RETURN 0;
END;

SELECT loginVendedor('cris@ejemplo.com', 12345678) FROM DUAL;



--- Obtener toda la informacion de un vendedor
SELECT V.ID, V.NOMBRE, V.APELLIDO, V.TELEFONO, V.EMAIL, D.DESCRIPCIÓN, RF.NOMBRE AS NOMBRE_REFERIDO, N.nombrenivel
FROM VENDEDOR V
JOIN VENDEDOR RF ON RF.ID = V.Vendedor_referido
JOIN DIRECCION D ON D.ID = V.DIRECCION
JOIN NIVEL N ON N.ID = V.NIVEL 
WHERE V.ID = 12;


--- ventas realizadas por cada vendedor, incluyendo el total vendido, las comisiones generadas, y la cantidad de productos vendidos.
SELECT v.ID AS vendedor_id,
       v.NOMBRE AS vendedor_nombre,
       v.APELLIDO AS vendedor_apellido,
       COUNT(DISTINCT ve.ID) AS total_ventas,
       NVL(SUM(dv.CANTIDAD),0) AS total_productos_vendidos,
       NVL(SUM(dv.CANTIDAD * dv.VALORUNITARIO),0) AS total_ingresos,
       NVL(SUM(c.VALORCOMISION),0) AS total_comisiones,
       COUNT(vr.ID) AS cant_ref
FROM VENDEDOR v
LEFT JOIN VENTA ve ON v.ID = ve.VENDEDOR
LEFT JOIN DETALLEVENTA dv ON ve.ID = dv.VENTA
LEFT JOIN COMISION c ON c.VENDEDOR = v.ID
LEFT JOIN VENDEDOR vr ON vr.VENDEDOR_REFERIDO = v.ID
GROUP BY v.ID, v.NOMBRE, v.APELLIDO
ORDER BY total_ingresos DESC;


-- Productos mas vendidos por ciudad
SELECT  ciu.NOMBRE AS ciudad,
       p.ID AS producto_id,
       p.NOMBRE AS producto_nombre,
       NVL(SUM(dv.CANTIDAD),0) AS total_vendido,
       NVL(SUM(dv.CANTIDAD * dv.VALORUNITARIO),0) AS total_ingresos
FROM DETALLEVENTA dv
JOIN PRODUCTO p ON dv.PRODUCTO = p.ID
JOIN VENTA ve ON dv.VENTA = ve.ID
JOIN ENVIO e ON e.VENTA = ve.ID
JOIN DIRECCION d ON e.DIRECCION = d.ID
JOIN CIUDAD ciu ON d.CIUDAD = ciu.ID
GROUP BY ciu.NOMBRE, p.ID, p.NOMBRE
ORDER BY ciu.NOMBRE, total_vendido DESC;

---muestra las ventas mensuales, con el total de ingresos y la cantidad de productos vendidos por cada mes.
SELECT TO_CHAR(ve.FECHA_VENTA, 'YYYY-MM') AS mes,
       COUNT(ve.ID) AS total_ventas,
       NVL(SUM(dv.CANTIDAD),0) AS total_productos_vendidos,
       NVL(SUM(dv.CANTIDAD * dv.VALORUNITARIO),0) AS total_ingresos
FROM VENTA ve
JOIN DETALLEVENTA dv ON ve.ID = dv.VENTA
GROUP BY TO_CHAR(ve.FECHA_VENTA, 'YYYY-MM')
ORDER BY mes ASC;


--- Productos con mayor rentabilidad
SELECT p.ID AS producto_id,
       p.NOMBRE AS producto_nombre,
      NVL( SUM(dv.CANTIDAD * dv.VALORUNITARIO),0) AS total_ingresos,
      NVL( SUM(c.VALORCOMISION),0) AS total_comisiones,
       NVL((SUM(dv.CANTIDAD * dv.VALORUNITARIO) - SUM(c.VALORCOMISION)) ,0)AS rentabilidad
FROM PRODUCTO p
JOIN DETALLEVENTA dv ON p.ID = dv.PRODUCTO
JOIN VENTA ve ON dv.VENTA = ve.ID
JOIN COMISION c ON c.VENTA = ve.ID
GROUP BY p.ID, p.NOMBRE
ORDER BY rentabilidad DESC;





