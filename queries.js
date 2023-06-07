const getStudentsByEmail = "SELECT u FROM USERAUTH u WHERE u.email = $1";
const addStudent = "INSERT INTO USERAUTH (username, email, password) VALUES($1, $2, $3)";

module.exports = {
    getStudentsByEmail,
    addStudent,
}