import styles from "./permission-description.module.css";

export default function PermissionDescription({ permissionError, setPermissionError }) {
  return (
    <div className={styles.permissionInstructions}>
      <h2>Permission Required</h2>
      <p>To use this feature, please enable {permissionError} access in your browser settings.</p>
      <h3>Chrome</h3>
      <ol>
        <li>Click on the lock icon next to the URL in the address bar.</li>
        <li>Select 'Site settings'.</li>
        <li>Find {permissionError} in the list and set it to 'Allow'.</li>
        <li>Refresh the page.</li>
      </ol>
      <h3>Firefox</h3>
      <ol>
        <li>Click on the shield icon next to the URL in the address bar.</li>
        <li>Click on 'Permissions' and select {permissionError}.</li>
        <li>Click 'Allow'.</li>
        <li>Refresh the page.</li>
      </ol>
      <h3>Safari</h3>
      <ol>
        <li>Click on 'Safari' in the top menu bar.</li>
        <li>Select 'Preferences'.</li>
        <li>Go to the 'Websites' tab.</li>
        <li>Find {permissionError} and set it to 'Allow'.</li>
        <li>Refresh the page.</li>
      </ol>
      <button onClick={() => setPermissionError(null)}>Close</button>
    </div>
  );
}
