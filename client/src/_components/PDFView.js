import React, { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import { Card, Drawer } from 'antd'
import styled from 'styled-components';
import cv1 from '_assets/cv1.pdf'
import cv2 from '_assets/cv2.pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export const PDFView = ({ show = false, cv = null }) => {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        if (!show) return
        setVisible(show);
    }, [show])

    return (
        <StyledDrawer
            placement="top"
            onClose={() => setVisible(false)} visible={visible} >
            <Card style={{ marginLeft: 200, marginRight: 200 }}>
                <Document file={
                    cv === "cv1.pdf" ? cv1
                        : cv === "cv2.pdf" ? cv2
                            : undefined}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <Page pageNumber={1} />
                </Document>
            </Card>
        </StyledDrawer >
    )
}

const StyledDrawer = styled(Drawer)`
.ant-drawer-close{
    color:white;
}
.ant-drawer-content-wrapper{
    height:100vh !important;
}
.ant-drawer-content{
    background: transparent;
}
background:transparent;
`
