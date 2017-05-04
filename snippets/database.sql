

-- Add a column
ALTER TABLE {TABLENAME} 
ADD {COLUMNNAME} {TYPE} {NULL|NOT NULL} 
CONSTRAINT {CONSTRAINT_NAME} DEFAULT {DEFAULT_VALUE}
[WITH VALUES]

-- Example
alter table Contracts add TextForAgenda varchar(50) null

