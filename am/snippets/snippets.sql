
-- Use CTRL + SHIFT + E to run the query.

if object_id('dbo.RliTest', 'U') is not null
begin
    alter table dbo.RliTest drop constraint PK_dbo_RliTest_Id
    drop table dbo.RliTest
end
go


create table dbo.RliTest
(
    Id int identity(1,1) not null constraint [PK_dbo_RliTest_Id] PRIMARY KEY,
    Column1 [varchar](max) not null
)
go

