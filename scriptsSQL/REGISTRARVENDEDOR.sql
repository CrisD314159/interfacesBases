--- Mecanismo de registrar usuario

--- Trigger que verifica que el vendedor exista
CREATE SEQUENCE seq_afiliacion
  START WITH 7
    INCREMENT BY 1;
CREATE SEQUENCE seq_inventario
  START WITH 7
    INCREMENT BY 1;
    
CREATE SEQUENCE seq_direccion
  START WITH 7
    INCREMENT BY 1;


EXECUTE crearVendedor(19, 'Marina', 'Fernandez', 31243123, 'mari.fer@gmail.com', '12345', 12, 'Calle 12 #11-22', 1);

CREATE OR REPLACE PROCEDURE crearVendedor (
    ID IN VENDEDOR.ID%TYPE, Nombre IN VENDEDOR.NOMBRE%TYPE, Apellido IN VENDEDOR.APELLIDO%TYPE, 
    Telefono IN VENDEDOR.TELEFONO%TYPE, Email IN VENDEDOR.EMAIL%TYPE, Vendedor_referido IN VENDEDOR.Vendedor_referido%TYPE, desc_direccion IN DIRECCION.Descripción%TYPE,
    id_ciudad IN DIRECCION.CIUDAD%TYPE,
    password VENDEDOR.Password%TYPE,
    v_returnValue OUT NUMBER
)AS
    v_idDireccion NUMBER;
BEGIN
        IF existeVendedor(ID) = 1 THEN
            RAISE_APPLICATION_ERROR(-1008, 'EL vendedor ya existe');
        END IF;
        
        
        v_idDireccion := seq_direccion.NEXTVAL;
       INSERT INTO Direccion (ID, Descripción, Ciudad) VALUES (v_idDireccion, desc_direccion, id_ciudad);
       
       INSERT INTO Vendedor (ID, Nombre, Apellido, Telefono, Email, Password, Vendedor_referido, Direccion, Nivel, Estado) 
       VALUES (ID, Nombre, Apellido, Telefono, Email, password, Vendedor_referido, v_idDireccion, 1, 1);
       v_returnValue := 1;
       
       COMMIT;
       

END;



CREATE OR REPLACE TRIGGER crear_afiliacion
    AFTER INSERT ON VENDEDOR 
    FOR EACH ROW
    
    BEGIN
        INSERT INTO INVENTARIO (ID, Vendedor) VALUES (seq_inventario.NEXTVAL, :NEW.ID);
        INSERT INTO Afiliacion (ID, FechaAfiliacion, Observacion, Vendedor) VALUES (seq_afiliacion.nextval, sysdate, 'Afiliación Por plataforma', :NEW.ID);
    
    EXCEPTION
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20001, 'Ocurrió un error en el registro de la afiliación');

END;