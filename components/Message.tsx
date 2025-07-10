type Props = {
alert_msg: string;
};

export function Message({alert_msg}:Props) {
  return (
    <div className="toast">
      <div className="alert font-semibold alert-info">
        <span>{alert_msg}</span>
      </div>
    </div>
  );
}
