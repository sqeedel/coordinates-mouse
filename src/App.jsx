import React, { useState, useEffect, useRef, memo } from "react";
import "./App.css";
import PropTypes from "prop-types";

function UserProfile(props) {
  return (
    <div>
      Имя: {props.name} Лет: {props.age} Его хобби: {props.hobbies}
    </div>
  );
}
function Buttonchik({ color, click, text }) {
  return (
    <button style={{ color }} onClick={click}>
      {text}
    </button>
  );
}
function Page({ title, text, footerText }) {
  return (
    <div>
      <header>{title}</header>
      <main>{text}</main>
      <footer>{footerText}</footer>
    </div>
  );
}
const withLogging = (LogName) => {
  return (props) => {
    console.log("Прогружено!", LogName.name);
    return <LogName {...props} />;
  };
};
const UserBasic = () => {
  return <div>Guest</div>;
};
const User1 = () => {
  return <div>User1</div>;
};
const UserLog = withLogging(UserBasic);
const UserLog1 = withLogging(User1);

const Tracker = ({ render }) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const MousePosition = (props) => {
    setPosition({ x: props.clientX, y: props.clientY });
  };
  return (
    <div style={{ height: "100vh" }} onMouseMove={MousePosition}>
      {render(position)}
    </div>
  );
};
const MemoTracker = memo(Tracker);

function App() {
  const [showContent, setShowContent] = useState(false);
  const handleSave = () => {
    setShowContent(true);
  };
  const handleDelete = () => {
    setShowContent(false);
  };
  return (
    <div className="App">
      <UserProfile
        name="Алексей"
        age={28}
        hobbies={["Футбол ", "Чтение ", "Программирование"]}
      />
      <Buttonchik text="Save" color="blue" click={handleSave} />
      <Buttonchik text="Delete" color="blue" click={handleDelete} />
      {showContent ? (
        <div>
          <ul>
            <li>Сохранено!</li>
          </ul>
        </div>
      ) : (
        <div>
          <ul>
            <li>Нажми на кнопку "Save" для сохранения</li>
          </ul>
        </div>
      )}
      <Page
        title="Welcome!"
        text="Основной контент страницы"
        footerText="Подвал страницы"
      />
      <div>
        <UserLog />
      </div>
      <UserLog1 />

      <MemoTracker
        render={({ x, y }) => (
          <h1>
            Координаты мыши: {x / 100}, {y / 100}
          </h1>
        )}
      />
    </div>
  );
}

export default App;
