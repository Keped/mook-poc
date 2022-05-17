import './RecordButton.css'

const RecordButton: React.FC<{title: string | number}> = (props) => {

  
  return (
    <button className="RecordButton">
        <h1>{props.title}</h1>
    </button>     
  );
}

export default RecordButton;