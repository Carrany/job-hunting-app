import { Button, Card, Col, Descriptions, Divider, Input, notification, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaFileInvoice } from 'react-icons/fa'
import styled from 'styled-components'
import { applicationsService } from '_services'
import { PDFView } from './PDFView'

export const JobApplicationView = ({ applicant = null }) => {
    const [showCV, setShowCV] = useState(false);
    const [application, setApplication] = useState(null);
    const [comments, setComments] = useState(null);
    const [isLoading, setLoading] = useState(false)
    const [isSaving, setSaving] = useState(false)

    useEffect(() => {
        if (!applicant) return
        getApplication(applicant?.id)
    }, [applicant])

    const getApplication = async (id) => {
        setLoading(true)
        try {
            let response = await applicationsService.fetchApplicationByCandidate({ candidate_id: id })
            let data = (response?.data || [])[0];
            setApplication(data)
            setComments(data?.comments || null)
            setTimeout(() => setLoading(false), 500)
        } catch (error) {
            setTimeout(() => setLoading(false), 500)
        }
    }

    const addComments = async (params) => {
        let final = {
            ...application,
            comments
        }
        setSaving(true)
        try {

            await applicationsService.addComment(application?.id, final);
            setTimeout(() => { setSaving(false); notification.success({ message: "Comment added successfully" }) }, 500)
            setTimeout(() => getApplication(application?.id), 1200)


        } catch (error) {
            setSaving(false)
        }
    }



    const displayCV = (params) => {
        setShowCV(true)
        setTimeout(() => setShowCV(false), 5)
    }

    return (
        <div>
            <Card style={{ borderRadius: 10 }} loading={isLoading}>

                <Box /> <StyledHeader>{applicant?.name}</StyledHeader>
                <Row gutter={[16, 5]}>
                    <Col span={20}>
                        <StyledDescriptions column={2}>
                            <Descriptions.Item label="Age">{application?.age}</Descriptions.Item>
                            <Descriptions.Item label="Years of Experience">{application?.years_of_experience}</Descriptions.Item>
                            <Descriptions.Item label="Job Title">{application?.job_title}</Descriptions.Item>
                            <Descriptions.Item label="Email">{application?.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone Number">{application?.phone_number}</Descriptions.Item>
                            <Descriptions.Item label="Current Salary">{application?.current_salary}</Descriptions.Item>
                            <Descriptions.Item label="Expected Salary">{application?.expected_salary}</Descriptions.Item>
                            <Descriptions.Item label="Available Start Date">{application?.available_start_date}</Descriptions.Item>
                        </StyledDescriptions>
                    </Col>
                    <Col span={4}>
                        <StyledTitle><label>Curriculum Vitae</label></StyledTitle>
                        <div style={{ marginLeft: 20 }}><FaFileInvoice fontSize={80} /></div>
                        {application?.cv ? (
                            <Button onClick={displayCV} style={{ marginLeft: 20 }} shape="round" type="primary" size="small">View CV</Button>

                        ) :
                            <Button disabled style={{ marginLeft: 20 }} shape="round" type="primary" size="small">CV Missing</Button>

                        }
                    </Col>
                </Row>

                <Divider orientation="left">Brief Bio</Divider>

                <TextArea style={{ color: "black", fontWeight: 500, marginBottom: 20 }} rows={5} disabled value={application?.bio} />
                <Divider orientation="left">Comments</Divider>
                <TextArea value={comments} onChange={e => setComments(e.target.value)} disabled={application?.comments ? true : false} style={{ width: "80%", marginRight: 10, color: "black", fontWeight: 500 }} />
                {!application?.comments && (
                    <Button loading={isSaving} disabled={(!comments || !application)} onClick={addComments} shape="round" type="primary" size="small">Save Comment</Button>

                )}
            </Card>
            <PDFView cv={application?.cv} show={showCV} />
        </div>
    )
}
const { TextArea } = Input
const StyledDescriptions = styled(Descriptions)`
.ant-descriptions-item {
    padding-bottom:5px;
}
.ant-descriptions-item-label{
    color:#BBC8C7;
}
.ant-descriptions-item-content{
    font-weight:600;
}
`

const Box = styled.div`
width: 15px;
height: 15px;
background:mediumspringgreen;
display: inline-grid;
border-radius:5px;
`

const StyledHeader = styled.text`
font-weight: 600;
font-size:20px;
margin-bottom:10px;
margin-left: 5px;
`

const StyledTitle = styled.div`
font-weight: 600;
`
