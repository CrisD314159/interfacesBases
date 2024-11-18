-- Actualizar categorias 

/* 
Nivel 4: 5 referidos y $1.500.00 en ventas
Nivel plata: 10 referidos y $1.500.00 en ventas
Nivel oro: 15 referidos y $2.500.00 en ventas
Nivel platino: 25 referidos y $3.500.00 en ventas
*/

EXECUTE actualizarCategorias;

SELECT * FROM VENDEDOR;

UPDATE VENDEDOR SET NIVEL = 4 WHERE ID = 10;

CREATE OR REPLACE PROCEDURE actualizarCategorias
AS
    CURSOR c_vendedores IS SELECT * FROM VENDEDOR;
BEGIN
    FOR r_vendedor IN c_vendedores LOOP
            IF r_vendedor.estado = 1 THEN
                actualizarCategoriaVendedor(r_vendedor.ID); 
            END IF;
    END LOOP;
    
    COMMIT;
END;


CREATE OR REPLACE PROCEDURE actualizarCategoriaVendedor
(
    id_vendedor VENDEDOR.ID%TYPE
)AS

    CURSOR c_ventas IS SELECT * FROM VENTA WHERE VENDEDOR = id_vendedor;
    v_totalVentas DETALLEVENTA.ValorUnitario%TYPE := 0;
    v_totalReferidos NUMBER := 0;
BEGIN
    FOR r_venta IN c_ventas LOOP
        v_totalVentas := v_totalVentas + obtenerSumaVentas(r_venta.ID);
    END LOOP;
    
    SELECT COUNT (*) INTO v_totalReferidos FROM VENDEDOR WHERE Vendedor_referido = id_vendedor;
    
    IF v_totalReferidos > 9 AND v_totalVentas > 1500000 THEN
        UPDATE VENDEDOR SET NIVEL = 2 WHERE ID = id_vendedor;
    ELSIF v_totalReferidos > 15 AND v_totalVentas > 2500000 THEN
        UPDATE VENDEDOR SET NIVEL = 3 WHERE ID = id_vendedor;
    ELSIF v_totalReferidos > 25 AND v_totalVentas > 3500000 THEN
        UPDATE VENDEDOR SET NIVEL = 4 WHERE ID = id_vendedor;
    ELSE
         UPDATE VENDEDOR SET NIVEL = 1 WHERE ID = id_vendedor;
    END IF;
    COMMIT;
END;

