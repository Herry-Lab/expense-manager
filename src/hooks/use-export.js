import React from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const useExport = () => {
  
  const exportPDF = React.useCallback((title, headers, data) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    // const title = "My Awesome Report";
    // const headers = [["NAME", "PROFESSION"]];
    // const data = this.state.people.map(elt=> [elt.name, elt.profession]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
      theme: 'grid'
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }, [])
  
  return {
    exportPDF
  }
}

export default useExport;
