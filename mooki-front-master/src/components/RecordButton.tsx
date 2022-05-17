import './RecordButton.css'

const RecordButton: React.FC<{title: string | number, handleClick: any}> = (props) => {

  return (
    <button className="RecordButton" onClick={props.handleClick}>
        <h1>{props.title}</h1>
    </button>     
  );
}

export default RecordButton;