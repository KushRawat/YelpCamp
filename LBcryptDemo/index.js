const bcrypt = require("bcrypt");

// const hashPassword = async (pw) => {
//     const salt = await bcrypt.genSalt(12);
//     const hash = await bcrypt.hash(pw, salt);
//     console.log(salt);
//     console.log(hash);
// };

const hashPassword = async (pw) => {
    // const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pw, 12);
    // console.log(salt);
    console.log(hash);
};

// hashPassword("KUSH");

const login = async (pw, hashedpw) => {
    const result = await bcrypt.compare(pw, hashedpw);
    if (result) {
        console.log("LOGGED IN");
    } else {
        console.log("Incorrect password");
    }
};

login("KUSH", "$2b$12$uvMHxVI24e0pOi/Q4NxN3uTnSe2PaPmOzGM/zwWqHqMLQt4sUxiaG");
//   $2b$12$pdxNRY6VaMuQjqIMeAKD1OvotSCuJaEvxAQYWq2ETBtO0Wd0cEq8S
//   $2b$12$0tVMP9pKODAcDlF9PvjCKO1T/5hxzgFPunevW5K.nBos2BhNVwQJe
//   $2b$12$uvMHxVI24e0pOi/Q4NxN3uTnSe2PaPmOzGM/zwWqHqMLQt4sUxiaG