
import React from 'react'
import styled from 'styled-components';
import Img404 from "../assets/404_img.webp";

const PageNotFound = () => {
    return (
        <Section80 className="404page-sec d-flex align-items-center">
            <div className="container">
                <div className="row align-items-center flex-md-row flex-column-reverse">
                    <div className="col-md-5 d-flex flex-wrap justify-content-md-start justify-content-center">
                        <TitleInnerSection className="mb-3 text-md-start text-center" style={{ color: "#686882" }}>
                            Oh no!
                            <br /> This page disappeared
                        </TitleInnerSection>
                        <Description className="mb-4 text-md-start text-center">
                            The page you are looking for doesn’t exist or has been moved
                        </Description>
                    </div>
                    <div className="offset-md-1 col-md-6">
                        <Image src={Img404} className="w-100" />
                    </div>
                </div>
            </div>
        </Section80>
    )
}

export default PageNotFound;

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