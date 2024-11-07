import { BasePage } from "../../components/BasePage";
import { Flex, Input, Button } from "antd";
const { TextArea } = Input;
import styled from "styled-components";
export default function Contact() {
    const onChange = (e) => {
        console.log(e.target.value);
    };
    return (
        <BasePage>
            <h1>Contact</h1>
            <div style={{ width: "100%", height: "500px" }}>
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.634272719197!2d106.79736097498644!3d10.850366860832254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752760019d6cb7%3A0x4e0db69b1195e574!2sFPT%20Software%20HCM%20Campus!5e0!3m2!1svi!2s!4v1696881044947!5m2!1svi!2s"
                    allowFullScreen
                    aria-hidden="false"
                    tabIndex="0"
                ></iframe>
            </div>
            <h1>Contact Form</h1>
            <ContactForm>
                <Flex vertical gap={32}>
                    <div>
                        <h3 className="phone">Phone number</h3>
                        <Input showCount maxLength={20} onChange={onChange} />
                    </div>
                    <div>
                        <h3 className="phone">Description</h3>
                        <TextArea
                            showCount
                            maxLength={100}
                            onChange={onChange}
                            placeholder="Enter your description"
                        />
                    </div>
                    <div className="button_wrapper">
                        <Button className="button_support" type="primary">
                            Submit
                        </Button>
                    </div>
                </Flex>
            </ContactForm>
        </BasePage>
    );
}

const ContactForm = styled.div`
    width: 40%;
    margin: 0 auto;
    margin-bottom: 8%;
    .phone {
        color: black;
        margin-bottom: 2px;
    }
    .button_wrapper {
        width: 100%;
        margin: 0 auto;
    }
    .button_support {
        width: 100%;
        background-color: #ff7a45;
        border-color: #ff7a45;
        &:hover {
            background-color: #ff7a45;
            border-color: #ff7a45;
        }
    }
`;
