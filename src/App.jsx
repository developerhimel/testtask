import React, { useState } from "react";
import Selectors from "./components/Selectors";
import { useEffect } from "react";
import axios from "axios";
import { SaveFilled, ReloadOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import "animate.css";

const globalApiUri = "https://testtaskapi.vercel.app";

function App() {
  const [user, setUser] = useState("");
  const [selectors, setSelectors] = useState();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [value, setValue] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleSave = () => {
    setLoading(true);
    if (userName === "") {
      Modal.warning({
        title: "Warning!",
        content: "Name field cannot be empty.",
        onOk: () => setLoading(false),
      });
    } else if (value.length < 1) {
      Modal.warning({
        title: "Warning!",
        content: "Sectors field cannot be empty.",
        onOk: () => setLoading(false),
      });
    } else if (checked === false) {
      Modal.warning({
        title: "Warning!",
        content: "You have to agree with our terms of service.",
        onOk: () => setLoading(false),
      });
    } else {
      axios
        .post(
          `${globalApiUri}/newUser`,
          {
            userName: userName,
            sectors: value,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          localStorage.setItem("user", response.data);
          console.log(response);
          setLoading(false);
          Modal.success({
            title: "Saved",
            content: "You have successfully saved your data.",
            onOk: () => setUser(response.data),
          });
        })
        .catch((error) =>
          Modal.error({
            title: "Error!",
            content: "Something went wrong.",
            onOk: () => setLoading(false),
          })
        );
    }
  };

  const handleUpdate = () => {
    setLoading(true);
    if (userName === "") {
      Modal.warning({
        title: "Warning!",
        content: "Name field cannot be empty.",
        onOk: () => setLoading(false),
      });
    } else if (value.length < 1) {
      Modal.warning({
        title: "Warning!",
        content: "Sectors field cannot be empty.",
        onOk: () => setLoading(false),
      });
    } else if (checked === false) {
      Modal.warning({
        title: "Warning!",
        content: "You have to agree with our terms of service.",
        onOk: () => setLoading(false),
      });
    } else {
      axios
        .post(
          `${globalApiUri}/updateUser`,
          {
            id: user,
            userName: userName,
            sectors: value,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          localStorage.setItem("user", response.data);
          console.log(response);
          setLoading(false);
          Modal.success({
            title: "Updated",
            content: "You have successfully updated your data.",
            onOk: () => setUser(response.data),
          });
        })
        .catch((error) =>
          Modal.error({
            title: "Error!",
            content: "Something went wrong.",
            onOk: () => setLoading(false),
          })
        );
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(user);
      axios
        .post(
          `${globalApiUri}/getUser`,
          {
            id: user,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setTimeout(() => {
            setUserName(response.data.userName);
            setValue(response.data.sectors);
          }, 1000);
          console.log(response.data);
        });
    }
    axios
      .get(`${globalApiUri}/getSelectors`)
      .then((response) => setSelectors(response.data));
  }, []);

  return (
    <main className="bg-gray-50 py-20 h-screen justify-center items-center">
      <div className="container m-auto">
        <div className="mx-3 lg:mx-0">
          <div className="max-w-3xl animate__animated animate__slideInUp m-auto bg-white p-10 rounded-md border shadow-md shadow-indigo-100 border-indigo-100">
            <h1 className="text-center font-semibold text-lg text-gray-500">
              Please enter your name
            </h1>
            <h1 className="text-center font-semibold text-lg text-gray-500">
              and pick the Sectors you are currently involved in.
            </h1>
            <div className="flex flex-col my-3 gap-2">
              <label htmlFor="name" className="font-semibold text-gray-600">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                className="border-gray-300 rounded-md border px-3 py-1.5 focus:ring-1 focus:ring-blue-400 outline-none"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
            </div>
            <div className="my-3">
              <Selectors
                selectors={selectors}
                value={value}
                setValue={setValue}
              />
            </div>
            <div className="flex items-center mb-4 mt-5">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 w-full"
              >
                Agree to terms
              </label>
            </div>
            <div className="flex justify-center items-center">
              {user ? (
                <Button
                  type="primary"
                  icon={<ReloadOutlined />}
                  loading={loading}
                  onClick={handleUpdate}
                  title="Save"
                  className="bg-indigo-600 hover:bg-indigo-700 h-10 px-5 text-base"
                >
                  {loading ? "Updating" : "Update"}
                </Button>
              ) : (
                <Button
                  type="primary"
                  icon={<SaveFilled />}
                  loading={loading}
                  onClick={handleSave}
                  title="Save"
                  className="bg-indigo-600 hover:bg-indigo-700 h-10 px-5 text-base"
                >
                  {loading ? "Saving" : "Save"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
