-- Eliminar un vendedor

CREATE OR REPLACE VIEW vista_vendedores_eliminar AS
SELECT * FROM VENDEDOR;




CREATE OR REPLACE TRIGGER eliminar_vendedor
    INSTEAD OF DELETE ON vista_vendedores_eliminar
    FOR EACH ROW 
    DECLARE 
        v_actualizarHijos NUMBER := 0;
        v_idPadre VENDEDOR.ID%TYPE;
        v_estadoInicial VENDEDOR.ESTADO%TYPE;
    BEGIN
        SELECT ESTADO INTO v_estadoInicial FROM vista_vendedores_eliminar WHERE ID = :OLD.ID;
        
        IF v_estadoInicial = 2 THEN
            RAISE_APPLICATION_ERROR(-40001, 'El vendedor a se encuentra eliminado');
        END IF;
        
        SELECT Vendedor_referido INTO v_idPadre FROM vista_vendedores_eliminar WHERE ID = :OLD.ID;
        actualizarHijos(:OLD.ID, v_idPadre, v_actualizarHijos);
        IF v_actualizarHijos <> 1 THEN
            RAISE_APPLICATION_ERROR(-40002, 'Ocurrió un error al reasignar los vendedores hijos');
        END IF;
        
        UPDATE vista_vendedores_eliminar SET  ESTADO = 2 WHERE ID = :OLD.ID;
END;


CREATE OR REPLACE PROCEDURE actualizarHijos(
    id_vendedor IN VENDEDOR.ID%TYPE, id_padre IN VENDEDOR.ID%TYPE, v_actualizarHijos OUT NUMBER
) AS

CURSOR c_vendedoresHijos IS SELECT * FROM vista_vendedores_eliminar WHERE Vendedor_referido = id_vendedor;
BEGIN
    FOR r_vendedor IN c_vendedoresHijos LOOP
        UPDATE vista_vendedores_eliminar SET Vendedor_referido = id_padre WHERE ID = r_vendedor.ID;
    END LOOP;
    v_actualizarHijos := 1;
    
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        v_actualizarHijos := 0;
END;



