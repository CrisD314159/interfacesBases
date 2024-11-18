-- Crear el rol Vendedor
CREATE ROLE C##vendedor;

-- Privilegios de sistema para el rol Vendedor
GRANT CREATE SESSION TO C##vendedor;
GRANT EXECUTE ANY PROCEDURE TO C##vendedor;

-- Privilegios específicos para el rol Vendedor
GRANT SELECT ON Vendedor TO C##vendedor;
GRANT SELECT ON Producto TO C##vendedor;
GRANT SELECT ON DetalleInventario TO C##vendedor;
GRANT SELECT ON Inventario TO C##vendedor;
GRANT SELECT ON Comision TO C##vendedor;
GRANT INSERT ON Venta TO C##vendedor;
GRANT INSERT ON DetalleVenta TO C##vendedor;
GRANT SELECT ON Envio TO C##vendedor;

-- Crear el rol Administrador
CREATE ROLE C##administrador;

-- Privilegios de sistema para el rol Administrador
GRANT CREATE SESSION TO C##administrador;
GRANT EXECUTE ANY PROCEDURE TO C##administrador;
GRANT CREATE USER TO C##administrador;
GRANT ALTER USER TO C##administrador;
GRANT DROP USER TO C##administrador;
GRANT CREATE ANY TABLE TO C##administrador;
GRANT ALTER ANY TABLE TO C##administrador;
GRANT DROP ANY TABLE TO C##administrador;
GRANT CREATE ANY INDEX TO C##administrador;
GRANT CREATE ANY VIEW TO C##administrador;
GRANT GRANT ANY PRIVILEGE TO C##administrador;
GRANT GRANT ANY ROLE TO C##administrador;
GRANT CREATE ANY PROCEDURE TO C##administrador;
GRANT CREATE ANY TRIGGER TO C##administrador;
GRANT CREATE ANY SEQUENCE TO C##administrador;

-- Privilegios específicos para el rol Administrador
GRANT SELECT, INSERT, UPDATE, DELETE ON Vendedor TO C##administrador;
GRANT SELECT, INSERT, UPDATE, DELETE ON Producto TO C##administrador;
GRANT SELECT, INSERT, UPDATE, DELETE ON DetalleInventario TO C##administrador;
GRANT SELECT, INSERT, UPDATE, DELETE ON Inventario TO C##administrador;
GRANT SELECT, INSERT, UPDATE, DELETE ON Comision TO C##administrador;
GRANT SELECT, INSERT, UPDATE, DELETE ON Venta TO C##administrador;
GRANT SELECT, INSERT, UPDATE, DELETE ON DetalleVenta TO C##administrador;
GRANT SELECT, INSERT, UPDATE, DELETE ON Envio TO C##administrador;
GRANT SELECT, INSERT, UPDATE, DELETE ON Direccion TO C##administrador;
