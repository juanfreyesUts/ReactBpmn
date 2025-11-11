// Hooks React
import { useRef, useState } from 'react';

// Librería BPMN
import BpmnModeler from 'bpmn-js/lib/Modeler';

export const useModeler = () => {
  const [visible, setVisible] = useState(true);
  const [diagram, setDiagram] = useState(false);
  const [error, setError] = useState(null);

  // Usar modeler con cache
  const modelerRef = useRef(null);

  const diagramInitial = `<?xml version="1.0" encoding="UTF-8"?>
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

  const createNewDiagram = () => {
    if (diagram === true) {
      const confirmed = window.confirm("Ya existe un diagrama en edición, ¿seguró desea crear uno nuevo?");
      if (!confirmed) return;
    }
    openDiagram(diagramInitial);
  }

  const openDiagram = async (xml) => {
    try {
      setDiagram(true);
      const canvas = document.getElementById('js-canvas');
      canvas.innerHTML = "";
      
      modelerRef.current = new BpmnModeler({
        container: canvas,
      });
      
      await modelerRef.current.importXML(xml);
      setVisible(false);
      setError(null);
    } catch (err) {
      setDiagram(false);
      setVisible(true);
      setError("Error al crear diagrama BPMN");
    }
  }

  const handleDownload = (data, linkId) => {
    if (!diagram) return false;
    
    const link = document.getElementById(linkId);
    if (link) {
      link.removeAttribute('href');
    }
    return window.confirm(`¿seguró desea descargar el BPMN en formato ${data}?`);
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
    const downloadSvgLink = document.getElementById('js-download-svg');
    const response = handleDownload("svg", 'js-download-svg');
    if (!response) return;
    
    try {
      const { svg } = await modelerRef.current.saveSVG();
      setEncoded(downloadSvgLink, "diagram.svg", svg);
    } catch (error) {
      console.error("Error: ",error);
      setEncoded(downloadSvgLink, "diagram.svg", null);
    }
  }

  const saveDiagram = async () => {
    const downloadLink = document.getElementById('js-download-diagram');
    const response = handleDownload("bpmn", 'js-download-diagram');
    if (!response) return;

    try {
      const { xml } = await modelerRef.current.saveXML({ format: true });
      setEncoded(downloadLink, "diagram.bpmn", xml);
    } catch (error) {
      console.error("Error: ",error);
      setEncoded(downloadLink, "diagram.bpmn", null);
    }
  }

  const dispatchUpload = (e) => {
    e.preventDefault();
    document.getElementById("upload-diagram").click();
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Verificar extensión
    if (!file.name.endsWith(".bpmn") && !file.name.endsWith(".xml")) {
      alert("Por favor selecciona un archivo .bpmn o .xml válido");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const xml = e.target.result;
      await openDiagram(xml);
    };
    reader.readAsText(file);

    event.target.value = "";
  };

  return {
    visible,
    diagram,
    error,
    createNewDiagram,
    handleDownload,
    saveSvg,
    saveDiagram,
    dispatchUpload,
    handleFileUpload,
  }
}
