// Estilos Css
import '../styles/modeler.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

// Hooks React
import { Link } from 'react-router-dom';
// Custom Hooks
import { useModeler } from '../hooks/useModeler';

// Iconos
import iconAdd from '../../assets/icons/add.png';
import iconFolder from '../../assets/icons/folder.png';
import iconBpmn from '../../assets/icons/bpmn.png';
import iconSvg from '../../assets/icons/svg.png';

export const ModelerApp = () => {
  const { visible, diagram, error, createNewDiagram, handleFileUpload, saveDiagram, saveSvg, dispatchUpload } = useModeler();

  return (
    <div>
      <div className="content" id="js-drop-zone">
        <div>
          <input
            type="file"
            id="upload-diagram"
            accept=".bpmn, .xml"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </div>
        {visible && (
          <div className="message">
            <div className="note">
              <a onClick={dispatchUpload}> Open </a> or 
              <Link id="js-create-diagram" to='/new' onClick={createNewDiagram}> Create </Link> BPMN diagram.
            </div>
          </div>
        )}
        {error && (
          <div className="message">
            <div className="note">
              <p>Ooops, we could not display the BPMN 2.0 diagram.</p>
              <div className="details">
                <span>cause of the problem</span>
                <h4>{error}</h4>
              </div>
            </div>
          </div>
        )}
        <div className="canvas" id="js-canvas">
        </div>
        {diagram && (
          <div className="buttons-control">
            <ul className="buttons">
              <li>
                <a id="js-open-diagram" onClick={dispatchUpload} title="open BPMN diagram">
                  <img src={iconFolder} alt="open" width={20} />
                </a> 
              </li>
              <li>
                <a id="js-create-svg" onClick={createNewDiagram} title="create BPMN diagram">
                  <img src={iconAdd} alt="create" width={20} />
                </a>
              </li>
            </ul>
            <ul className="buttons">
              <li>
                <a id="js-download-diagram" title="download BPMN diagram" onClick={saveDiagram}>
                  <img src={iconBpmn} alt="bpmn" width={20} />
                </a>
              </li>
              <li>
                <a id="js-download-svg" title="download as SVG image" onClick={saveSvg}>
                  <img src={iconSvg} alt="svg" width={20} />
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
