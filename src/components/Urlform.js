import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { TbLayersLinked } from "react-icons/tb";
import { RiFileCopyLine } from "react-icons/ri";
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Img404 from "../assets/404_img.webp";

const Urlform = () => {
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [shortUrlId, setShortUrlId] = useState('');
    const [copyStatus, setCopyStatus] = useState(false);
    const [url, setUrl] = useState('');
    const [notFound, setNotFound] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setUrl(event.target.elements.url.value)
        try {
            const response = await axios.post(
                'http://localhost:5000/shorten-url',
                { url },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log(response)
            if (response.data.success) {
                setShortenedUrl(response.data.shortenedUrl);
                setShortUrlId(response.data.shortUrlId);
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    const onCopyText = () => {
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000);
    };

    const handleLink = async () => {
        console.log(shortenedUrl.split('/'))
        try {
            const response = await axios.get(
                `http://localhost:5000/${shortUrlId}`
            );
            if(response?.data?.success){
                window.location = response?.data?.shortenedUrl
            }else setNotFound(true);
        } catch (error) {
            console.error("Network Error:", error);
        }
    }
    return (
        <Container>
            <Row className='justify-content-center align-items-center m-5'>
                <Col xs={6}>
                    <div className='d-flex align-items-center'>
                        <MainLabel className='me-3'>URL Shortener</MainLabel>
                        <TbLayersLinked size={30} />
                    </div>
                    <FormLabel>Enter The URL to Shorten</FormLabel>
                    <Form onSubmit={handleSubmit}>
                        <FormTit>URL</FormTit>
                        <Form.Control
                            type="url"
                            id="url"
                            onInput={(e) => setUrl(e.target.value)}
                            aria-describedby="passwordHelpBlock"
                        />
                        <ButtonPrimary disabled={shortenedUrl || url == '' ? true : false} variant="primary mt-3" type="submit">Shorten</ButtonPrimary>
                    </Form>
                    {shortenedUrl && (
                        <div className='mt-3'>
                            <ResTit>Success! Here's your short URL:</ResTit>
                            <Row className='align-items-center'>
                                <Col md={6}>
                                    <Url href={shortenedUrl} onClick={handleLink}>{shortenedUrl}</Url>
                                </Col>
                                <Col md={6}>
                                    <CopyToClipboard text={shortenedUrl} onCopy={onCopyText}>
                                        <ButtonOutline variant="outline-primary" >
                                            <RiFileCopyLine size={18} />
                                            Copy
                                        </ButtonOutline>
                                    </CopyToClipboard>
                                </Col>
                                {copyStatus && <p style={{ fontFamily: 'monospace' }}>Text copied to clipboard!</p>}
                            </Row>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Urlform;

const MainLabel = styled(Form.Label)`
    font-size: 30px;
    font-family: sans-serif; 
    font-weight: 600;
`;

const FormLabel = styled(Form.Label)`
    font-size: 20px;
    font-family: sans-serif;
    font-weight: 400;
`;

const FormTit = styled(Form.Label)`
    font-size: 20px;
    font-family: sans-serif;
    font-weight: 600;
`;

const ButtonOutline = styled(Button)`
    border-color: #7861d3 !important;
    color: #7861d3 !important;
    font-weight: 500;
    &:hover {
        border-color: #7861d3;
        background-color: transparent !important;
        color: #7861d3;
    }
    &:active {
        background-color: transparent !important;
    }
`
const ButtonPrimary = styled(Button)`
    background-color: #7861d3 !important;
    border-color: #7861d3 !important;
    color: #fff !important;
    font-weight: 500;
    &:hover {
        // border-color: #7861d3;
        background-color: #7861d3 !important;
        // color: #7861d3;
    }
    &:active {
        background-color: #7861d3 !important;
    }
`

const ResTit = styled(Form.Label)`
    font-size: 20px;
    font-weight: 400;
    font-style: italic;
    color: green;
    font-weight: 500
`;

const Url = styled.a`
    font-size: 16px;
    font-weight: 500;
    color: #7861d3;
    margin-right:20px
`;
const Section80 = styled.section`
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: 80px;
  @media (max-width: 767px) {
    padding-top: 40px;
    padding-bottom: 40px;
  }
`;

const Image = styled.img`
  // max-width:518px;
`;

const TitleInnerSection = styled.h3`
font-size: calc(calc((100vw - 428px) / 1012* 10) + 20px);
line-height: calc(calc((100vw - 428px) / 1012* 10) + 26px);
letter-spacing: calc(calc((100vw - 428px) / 1012* -.2) + .2px);
  font-family: 'bold';
  @media (min-width: 1440px) {
    font-size: 1.875rem;
    line-height: 2.25rem;
    letter-spacing: 0;
  }
  @media (min-width: 1px) and (max-width: 428px) {
    font-size: 1.25rem;
    line-height: 1.625rem;
    letter-spacing: .0125rem;
  }
`;

const Description = styled.p`
opacity:0.75;
  font-size: calc(calc((100vw - 428px) / 1012 * 2) + 16px);
  line-height: calc(calc((100vw - 428px) / 1012 * 4) + 22px);
  letter-spacing: calc(calc((100vw - 428px) / 1012 * 0) + 0.25px);
  font-family: 'bold';
  @media (min-width: 1440px) {
    font-size: 1.125rem;
    line-height: 1.625rem;
    letter-spacing: 0.015625rem;
  }
  @media (min-width: 1px) and (max-width: 428px) {
    font-size: 1rem;
    line-height: 1.375rem;
    letter-spacing: 0.015625rem;
  }
`;
