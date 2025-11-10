import '../styles/styles.css'
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

import BpmnModeler from 'bpmn-js/lib/Modeler';
import { useRef, useState } from 'react';

export const ModelerApp = () => {
  const [error, setError] = useState(null);
  const modelerRef = useRef(null);

  const diagramXML = `<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
      xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
      xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
      xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
      id="Definitions_1"
      targetNamespace="http://bpmn.io/schema/bpmn">
      <bpmn:process id="Process_1" isExecutable="false">
        <bpmn:startEvent id="StartEvent_1"/>
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
          <bpmndi:BPMNShape id="BPMNShape_StartEvent_1" bpmnElement="StartEvent_1">
            <dc:Bounds x="186" y="82" width="36" height="36" />
          </bpmndi:BPMNShape>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>`;

  const createNewDiagram = (event) => {
    event.preventDefault();
    openDiagram(diagramXML);
  }

  const openDiagram = async (xml) => {
    try {
      const canvas = document.getElementById('js-canvas');
      canvas.innerHTML = "";

      modelerRef.current = new BpmnModeler({
        container: '#js-canvas',
      });

      await modelerRef.current.importXML(xml);
      setError(null);
    } catch (err) {
      setError("Error al crear diagrama BPMN");
      console.log(err);
    }
  }

  const setEncoded = (link, name, data) => {
    if (!link) return;
    
    if (data) {
      let encodedData = encodeURIComponent(data);
      link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData;
      link.download = name;
    } else {
      console.error("Error: ",data);
    }
  }
  
  const saveSvg = async () => {
    try {
      const downloadSvgLink = document.getElementById('js-download-svg');
      const { svg } = await modelerRef.current.saveSVG();
      setEncoded(downloadSvgLink, "diagram.svg", svg);
    } catch (error) {
      console.error("Error: ",error);
      setEncoded(downloadSvgLink, "diagram.svg", null);
    }
  }

  const saveDiagram = async () => {
    try {
      const downloadLink = document.getElementById('js-download-diagram');
      const { xml } = await modelerRef.current.saveXML({ format: true });
      setEncoded(downloadLink, "diagram.bpmn", xml);
    } catch (error) {
      console.error("Error: ",error);
      setEncoded(downloadLink, "diagram.bpmn", null);
    }
  }

  return (
    <div>
      <div className="content" id="js-drop-zone">
        <div className="message">
          <div className="note">
            Drop BPMN diagram from your desktop or 
            <a id="js-create-diagram" href='' 
              onClick={createNewDiagram} title='Create a new diagram'> create a new diagram </a> 
            to get started.
          </div>
        </div>
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
        <div className="canvas" id="js-canvas"></div>
      </div>
      <ul className="buttons">
        <li>
          download
        </li>
        <li>
          <a id="js-download-diagram" href='' title="download BPMN diagram" onClick={saveDiagram} ref={modelerRef}>
            BPMN diagram
          </a>
        </li>
        <li>
          <a id="js-download-svg" href='' title="download as SVG image" onClick={saveSvg}>
            SVG image
          </a>
        </li>
      </ul>
    </div>
  )
}
