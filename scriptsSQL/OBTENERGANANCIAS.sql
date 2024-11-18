CREATE OR REPLACE TYPE t_vendedor_est AS OBJECT (
    nombreNivel VARCHAR2(100),
    PorcentajeComision NUMBER(5, 2),
    PorcentajeComisionReferido NUMBER(5, 2),
    PorcentajeComisionNieto NUMBER(5, 2),
    total_comisiones NUMBER(10, 2),
    total_ventas NUMBER(10, 2)
);


CREATE OR REPLACE FUNCTION obtenerEstadisticas(
    id_vendedor VENDEDOR.ID%TYPE
) RETURN t_vendedor_est AS

    -- Declara la variable de tipo t_vendedor_est
    v_vendedor_est t_vendedor_est;

    CURSOR c_ventas IS SELECT * FROM VENTA WHERE VENDEDOR = id_vendedor;

BEGIN
    -- Selecciona datos del nivel y los asigna a la variable v_vendedor_est
    SELECT t_vendedor_est(
        n.nombreNivel,
        n.PorcentajeComision,
        n.PorcentajeComisionReferido,
        n.PorcentajeComisionNieto,
        obtenerSumaComisiones(id_vendedor),  -- Llama a la función directamente
        0                                    -- Inicializa total_ventas en 0
    )
    INTO v_vendedor_est
    FROM NIVEL n
    JOIN VENDEDOR V ON n.ID = v.nivel
    WHERE V.ID = id_vendedor;

    -- Calcula el total de ventas
    FOR r_ventas IN c_ventas LOOP
        v_vendedor_est.total_ventas := v_vendedor_est.total_ventas + obtenerSumaVentas(r_ventas.ID);
    END LOOP;
  
    -- Retorna el registro completo
    RETURN v_vendedor_est;
END;


CREATE OR REPLACE FUNCTION obtenerSumaVentas(
    id_venta VENTA.ID%TYPE
)RETURN NUMBER AS
    CURSOR c_detalles is 
    SELECT *
    FROM DETALLEVENTA
    WHERE VENTA = id_venta;
    v_valorVentas DETALLEVENTA.ValorUnitario%TYPE := 0;
BEGIN

    FOR r_detalle IN c_detalles LOOP
        v_valorVentas := v_valorVentas + r_detalle.ValorUnitario;    
    END LOOP;
    
    return v_valorVentas;
END;



CREATE OR REPLACE FUNCTION obtenerSumaComisiones(
    id_vendedor VENDEDOR.ID%TYPE
)RETURN NUMBER AS
    CURSOR c_comisiones is 
    SELECT * 
    FROM COMISION  
    WHERE VENDEDOR = id_vendedor;
    v_valorComisiones COMISION.VALORCOMISION %TYPE := 0;
BEGIN

    FOR r_comision IN c_comisiones LOOP
        v_valorComisiones := v_valorComisiones + r_comision.VALORCOMISION;    
    END LOOP;
    
    return v_valorComisiones;
END;



---- PRUEBA DEL MECANISMO

DECLARE
    v_estadisticas t_vendedor_est;
BEGIN
    -- Llama a la función y asigna el resultado a la variable
    v_estadisticas := obtenerEstadisticas(4);  -- Reemplaza 1 con el ID deseado

    -- Imprime los resultados
    DBMS_OUTPUT.PUT_LINE('Nombre Nivel: ' || v_estadisticas.nombreNivel);
    DBMS_OUTPUT.PUT_LINE('Porcentaje Comisión: ' || v_estadisticas.PorcentajeComision);
    DBMS_OUTPUT.PUT_LINE('Porcentaje Comisión Referido: ' || v_estadisticas.PorcentajeComisionReferido);
    DBMS_OUTPUT.PUT_LINE('Porcentaje Comisión Referido: ' || v_estadisticas.PorcentajeComisionNieto);
    DBMS_OUTPUT.PUT_LINE('Total Comisiones: ' || v_estadisticas.total_comisiones);
    DBMS_OUTPUT.PUT_LINE('Total Ventas: ' || v_estadisticas.total_ventas);
END;





