import { List, Avatar, PageHeader } from 'antd';
import React, { useEffect, useState } from 'react'
import { FaUserGraduate } from 'react-icons/fa'
import styled, { keyframes } from 'styled-components';
import { candidatesService } from '_services';
import { zoomIn } from 'react-animations';

export const CandidatesSideView = (props) => {
    const [candidates, setCandidates] = useState([])
    const [activeUser, setActiveUser] = useState(null)
    useEffect(() => {
        getCandidates()
    }, [])

    const getCandidates = async (params) => {
        try {
            let response = await candidatesService.fetchCandidates();
            setCandidates(response?.data || [])

        } catch (error) {

        }
    }

    const selectedUser = (params) => {
        setActiveUser(params)
        props.applicant(params)
    }

    return (
        <div>
            <StyledPageHeader title="Candidates" />
            <StyledList
                itemLayout="horizontal"
                dataSource={candidates}
                renderItem={item => {
                    let backgroundColor = colors[Math.floor(Math.random() * colors.length)]
                    return <List.Item style={{
                        background: activeUser?.id === item?.id ? "cyan" : "white"
                        , marginBottom: 5
                    }} active={true} onClick={() => selectedUser(item)}>
                        <List.Item.Meta
                            avatar={<Avatar style={{ backgroundColor }} icon={<FaUserGraduate />} />}
                            title={item.name}
                            description={item.role}
                        />
                    </List.Item>
                }}
            />


        </div>
    )
}
const zoomInAnimation = keyframes`${zoomIn}`;
const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']

const StyledList = styled(List)`
.ant-list-item{
    border-radius: 10px;
    padding-left: 10px;
    animation: 2s ${zoomInAnimation};
}

`
const StyledPageHeader = styled(PageHeader)`
    background: cyan;
    border-radius: 10px;
    padding: 5px;
    display: inline-grid;
    margin-bottom: 10px;
`

