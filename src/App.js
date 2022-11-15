import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaste } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Stack } from "@mui/system";

function App() {
  const numbers1 = "0123456789";
  const UPPERCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const specialCharacters = "!'^+%&/()-?_#$%{[]}|;:>+`<.*-@";

  const [password, setPassword] = useState("");
  const [passwordlength, setPasswordLength] = useState(15);
  const [uppercase, setUpperCase] = useState(false);
  const [lowercase, setLowerCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  console.log(password);
  const successfully = "copied successfully";

  useEffect(
    (_) => {
      if (isCopied) {
        copiedSucess(successfully);
        setTimeout((_) => {
          setIsCopied(false);
          setPassword("");
        }, 6000);
      }
    },
    [isCopied]
  );
  const copiedSucess = (e) => {
    toast.success(e, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const copiedFailed = (e) => {
    toast.error(e, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const generatePassword = (_) => {
    var characterList = "";
    if (!numbers && !symbols && !lowercase && !uppercase) {
      copiedFailed(
        "!generating password failed! you need to select minimum 1option"
      );
    }

    if (uppercase) {
      characterList = characterList + UPPERCaseLetters;
    }
    if (lowercase) {
      characterList = characterList + lowerCaseLetters;
    }
    if (numbers) {
      characterList = characterList + numbers1;
    }
    if (symbols) {
      characterList = characterList + specialCharacters;
    }

    setPassword(createPassword(characterList));
  };
  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;

    for (let i = 0; i <= passwordlength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }

    return password;
  };

  return (
    <div className="App">
      <Container
        className="container"
        sx={{
          height: 600,
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box className="box" sx={{ width: "80%", height: "75%" }}>
          <Stack sx={{ padding: 1 }}>
            <h1>Password Generator</h1>

            <Stack
              direction="row"
              backgroundColor="rgba(128,128,128,0.4)"
              display="flex"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <span
                style={{
                  fontSize: "100%",
                  minHeight: 40,
                  marginLeft: "2%",
                  width: "80%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                }}
              >
                {password}
              </span>
              <CopyToClipboard
                text={password}
                onCopy={(_) => setIsCopied(true)}
              >
                <FontAwesomeIcon
                  className="clipboard"
                  style={{
                    width: "5%",
                    padding: 5,
                    backgroundColor: `${
                      isCopied === false ? "#138496" : "green"
                    }`,
                    height: "auto",
                  }}
                  icon={faPaste}
                />
              </CopyToClipboard>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            sx={{
              fontWeight: 500,
              fontSize: "100%",
              paddingLeft: 1,
              marginTop: 1,
              marginBottom: 4,
            }}
            display="flex"
            justifyContent="space-between"
          >
            <label style={{ paddingLeft: 5 }}>Select Password length</label>
            <input
              defaultValue={passwordlength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              name="password_length"
              min={10}
              max={20}
            />
          </Stack>
          <Stack
            direction="row"
            sx={{ fontWeight: 600, fontSize: "100%", paddingLeft: 1 }}
          >
            <input
              type="checkbox"
              onChange={(e) => setUpperCase(e.target.checked)}
              checked={uppercase}
              name="uppercase"
            />

            <label style={{ paddingLeft: 5 }}>Include uppercase letters</label>
          </Stack>
          <Stack
            direction="row"
            sx={{ fontWeight: 500, fontSize: "100%", paddingLeft: 1 }}
          >
            <input
              type="checkbox"
              onChange={(e) => setLowerCase(e.target.checked)}
              checked={lowercase}
              name="lowercase"
            />

            <label style={{ paddingLeft: 5 }}>Include lowercase Letters</label>
          </Stack>
          <Stack
            direction="row"
            sx={{ fontWeight: 500, fontSize: "100%", paddingLeft: 1 }}
          >
            <input
              type="checkbox"
              onChange={(e) => setNumbers(e.target.checked)}
              checked={numbers}
              name="numbers"
            />

            <label style={{ paddingLeft: 5 }}>Include numbers</label>
          </Stack>
          <Stack
            direction="row"
            sx={{ fontWeight: 500, fontSize: "100%", paddingLeft: 1 }}
          >
            <input
              type="checkbox"
              onChange={(e) => setSymbols(e.target.checked)}
              checked={symbols}
              name="symbols"
            />

            <label style={{ paddingLeft: 5 }}>Inlcude symbols</label>
          </Stack>
          <button
            className="button"
            onClick={generatePassword}
            style={{
              width: "90%",
              cursor: "pointer",
              fontSize: "100%",
              padding: "1.5%",
              marginTop: "6.5%",
              backgroundColor: "#138496",
              color: "white",
              border: "white",
              outline: "2px solid #9dd7e1",
              outlineOffset: 0.5,
              borderRadius: 2,
            }}
          >
            Generate Password
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Box>
      </Container>
    </div>
  );
}

export default App;
