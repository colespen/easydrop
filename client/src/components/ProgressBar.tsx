const ProgressBar = ({ uploadPercentage }: { uploadPercentage: number }) => {
  return (
    <div className="progress-container">
      <label className="progress-percent" htmlFor="file">{uploadPercentage}%</label>
      <progress
        className="progress-bar"
        id="file"
        value={uploadPercentage}
        max="100"
      ></progress>
    </div>
  );
};
export default ProgressBar;
