const getStudentsByEmail = 'SELECT * FROM "USERAUTH" WHERE "email" = $1';
const addStudent = 'INSERT INTO "USERAUTH" (username, email, password) VALUES($1, $2, $3) RETURNING *';
const getUsers = 'SELECT * FROM "USERAUTH"';
const getUsersById = 'SELECT * FROM "USERAUTH" WHERE "id" = $1';
const deleteUserById = 'DELETE FROM "USERAUTH" WHERE "id" = $1';

module.exports = {
    getStudentsByEmail,
    addStudent,
    getUsers,
    getUsersById,
    deleteUserById
}