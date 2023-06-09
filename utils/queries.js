//user queries
const getStudentsByEmail = 'SELECT * FROM "USERAUTH" WHERE "email" = $1';
const addStudent = 'INSERT INTO "USERAUTH" (username, email, password) VALUES($1, $2, $3) RETURNING *';
const getUsers = 'SELECT * FROM "USERAUTH"';
const getUsersById = 'SELECT * FROM "USERAUTH" WHERE "use_id" = $1 ';
const deleteUserById = 'DELETE FROM "USERAUTH" WHERE "use_id" = $1';
//file queries
const addFile = 'INSERT INTO "FILES" (user_id, file_name, file_path, file_size, course) VALUES($1, $2, $3, $4) RETURNING *';
const getFiles = 'SELECT * FROM "FILES"';
const getFileById = 'SELECT * FROM "FILES" WHERE "file_id" = $1';
const getFilesByCourse = 'SELECT * FROM "FILES" WHERE "course" = $1';
const deleteFile = 'DELETE FROM "FILES" WHERE "file_id" = $1';

module.exports = {
    getStudentsByEmail,
    addStudent,
    getUsers,
    getUsersById,
    deleteUserById,
    addFile,
    getFiles,
    getFileById,
    getFilesByCourse,
    deleteFile
}