# Database Theory

## Normalization
> restructuring a relational db in order to reduce data redundancy and increase integrity

idea by Codd in 1970

For properly enforcing dependencies via integrity constraints by organizing columns (attributes) and tables (relations)

#### Objectives:
1. avoid undesirable insertion, update, and deletion dependencies
2. reduce need for restructuring collection of relations as new types of data are added
3. more information relational model

#### Issues:
- Update anomaly: same info expressed on multiple rows, which may lead to logical inconsistency
- Insertion anomaly: need to insert values into table but a meaningful column is not yet available, thus forcing a null
- Deletion anomaly: must delete more information than is necessary because excess data in one table

#### Normal Forms
- considered normalized if it meets 3NF (none of the three anomalies), but goes up to 6NF
- 1NF: must be atomic (value cannot be broken down further), must have unique-key constraint, no ordering between records, separate table for each set of related data
- 2NF: same as 1NF but cannot have one primary key with functional dependencies on part of any attribute of the record. Essentially other data that isn't the primary key that's repeated
- 3NF: all attributes are determined only by candidate keys and not by any non-prime attributes
    * ideal for OLTP with heavy order entry 
    * all attributes of a table are related to the primary key and only the primary key
- 4NF: multi-valued dependency where A, B, C but there are relations between {A, B} and {A, C}. Should split into two tables in that case
- 5NF: most 4NF fit in 5, will skip
- 6NF: exists, but will skip

## Truncate vs. Delete
- `delete` is transactional and conditional
- `truncate` will wipe out table