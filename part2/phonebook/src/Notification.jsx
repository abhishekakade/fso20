import React from "react";

const Notification = ({ messageAndStatus }) => {
  const { message, status } = messageAndStatus;
  console.log(message, status);

  return (
    <div className={`notification-toast ${status}`}>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Notification;
