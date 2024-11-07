// StylistProfile.jsx
import React from "react";
import styled from "styled-components";
import { Building2, UserRoundCheck, MapPin, Receipt, Zap } from "lucide-react";
import { BasePage } from "../../components/BasePage";

const workSchedule = [
    { day: "Thứ 2", hours: "8:00 - 17:00" },
    { day: "Thứ 3", hours: "8:00 - 17:00" },
    { day: "Thứ 4", hours: "8:00 - 17:00" },
    { day: "Thứ 5", hours: "8:00 - 17:00" },
    { day: "Thứ 6", hours: "8:00 - 17:00" },
    { day: "Thứ 7", hours: "9:00 - 15:00" },
    { day: "Chủ nhật", hours: "9:00 - 17:00" },
];

const listMenu = [
    { id: 1, title: "Giới thiệu" },
    { id: 2, title: "Kinh nghiệm làm việc" },
];

const Container = styled.div`
    width: 80%;
    margin: 3rem auto 2.5rem;
`;

const GridLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding-top: 2.5rem;

    @media (min-width: 1024px) {
        grid-template-columns: 70% 30%;
        gap: 1.5rem;
    }
`;

const MainContent = styled.div`
    margin-right: 5rem;

    @media (max-width: 1023px) {
        margin-right: 0;
    }
`;

const AvatarContainer = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 1rem;
    align-items: flex-start;
    .name_stylist {
        font-size: 1.5rem;
        font-weight: bold;
    }
`;

const StyledAvatar = styled.div`
    img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 50%;
    }
`;

const StyledBadge = styled.div`
    background-color: #ff4d4f;
    color: #fff;
    text-align: center;
    font-weight: bold;
    display: flex;
    justify-content: center;
    width: 80px;
    margin-top: 0.5rem;
    border: 1px solid #ff4d4f;
    border-radius: 14px;
    padding: 0.2rem;
    font-size: 16px;
`;

const BadgeRight = styled.div`
    background-color: #ff4d4f;
    color: #fff;
    padding: 0.5rem;
    border-radius: 18px;
    font-weight: bold;
    border: 1px solid #ff4d4f;
    cursor: default;
    font-size: 16px;
    padding: 0.5rem 12px 0.5rem 12px;
    &:hover {
        background-color: #ff4d4f;
    }
`;

const InfoGrid = styled.div`
    width: 100%;
    margin-top: 1.25rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
`;

const InfoItem = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem;
    align-items: center;
`;

const InfoLabel = styled.div`
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #6b7280; /* text-muted-foreground */
`;

const InfoText = styled.p`
    font-size: 14px;

    color: #6b7280;
`;

const MenuContainer = styled.div`
    margin-top: 1.25rem;
`;

const Menu = styled.div`
    display: flex;
    gap: 1.5rem;
    width: 100%;
    border-bottom: 2px solid #e5e7eb;
`;

const MenuItem = styled.p`
    font-weight: 600;
    font-size: 1.25rem;
    cursor: pointer;
    color: ${({ active }) => (active ? "#ff4d4f" : "#4b5563")};
    border-bottom: ${({ active }) => (active ? "4px solid #ff4d4f" : "none")};
    padding-bottom: ${({ active }) => (active ? "0.5rem" : "0")};
    &:hover {
        color: #ff4d4f;
    }
`;

const DetailContent = styled.div`
    margin-top: 1rem;
    font-size: 1.125rem;
    color: #6b7280;

    h2 {
        font-weight: bold;
        font-size: 2rem;
    }

    p {
        margin-top: 1rem;
        line-height: 1.75rem;
    }
`;

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const PriceCard = styled.div`
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PriceInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    margin-bottom: 1rem;
`;

const StyledButton = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: #ff4d4f;
    color: #fff;

    &:hover {
        background-color: #ff4d4f;
    }
`;

const WorkScheduleCard = styled.div`
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
`;

const WorkScheduleHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const ScheduleList = styled.div`
    width: 100%;
`;

const ScheduleItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e5e7eb;
    &:last-child {
        border-bottom: none;
    }
    h2 {
        font-weight: 600;
        font-size: 1rem;
    }
    p {
        color: #6b7280;
    }
`;

export default function StylistProfile() {
    const [activeMenu, setActiveMenu] = React.useState(1);

    const renderDetailMenu = () => {
        switch (activeMenu) {
            case 1:
                return (
                    <DetailContent>
                        <h2>Giới thiệu chuyên gia</h2>
                        <p>
                            Anh Hoàng là một stylist chuyên nghiệp, có kinh
                            nghiệm lâu năm trong ngành tóc. Anh đã từng làm việc
                            tại các salon nổi tiếng ở HCM. Anh có khả năng tư
                            vấn và thực hiện các kiểu tóc phù hợp với khuôn mặt
                            và phong cách của khách hàng.
                        </p>
                        <p>
                            Hiện tại, anh đang làm việc tại salon Hair Harmony,
                            HCM. Ngoài ra, anh còn nhận dạy học viên tại trung
                            tâm đào tạo tóc Hair Harmony.
                        </p>
                    </DetailContent>
                );
            case 2:
                return (
                    <DetailContent>
                        <h2>Kinh nghiệm làm việc</h2>
                        <p>
                            Anh Hoàng có kinh nghiệm làm việc trong ngành tóc là
                            10 năm. Anh đã từng làm việc tại các salon nổi tiếng
                            ở HCM. Anh có khả năng tư vấn và thực hiện các kiểu
                            tóc phù hợp với khuôn mặt và phong cách của khách
                            hàng.
                        </p>
                    </DetailContent>
                );
            default:
                return null;
        }
    };

    return (
        <BasePage>
            <Container>
                <GridLayout>
                    <MainContent>
                        <AvatarContainer>
                            <StyledAvatar>
                                <img
                                    src="https://github.com/shadcn.png"
                                    alt="Hoàng Nguyễn"
                                />
                            </StyledAvatar>
                            <div>
                                <h3 className="name_stylist">Hoàng Nguyễn</h3>
                                <StyledBadge>Stylist</StyledBadge>
                                <InfoGrid>
                                    <InfoItem>
                                        <InfoLabel>
                                            <Building2
                                                style={{
                                                    stroke: "#6b7280",
                                                    width: "1.25rem",
                                                    height: "1.25rem",
                                                }}
                                            />
                                            <span>Chức vụ:</span>
                                        </InfoLabel>
                                        <InfoText>Chuyên gia</InfoText>
                                    </InfoItem>
                                    <InfoItem>
                                        <InfoLabel>
                                            <UserRoundCheck
                                                style={{
                                                    stroke: "#6b7280",
                                                    width: "1.25rem",
                                                    height: "1.25rem",
                                                }}
                                            />
                                            <span>Kinh nghiệm:</span>
                                        </InfoLabel>
                                        <InfoText>10 Năm</InfoText>
                                    </InfoItem>
                                    <InfoItem>
                                        <InfoLabel>
                                            <MapPin
                                                style={{
                                                    stroke: "#6b7280",
                                                    width: "1.25rem",
                                                    height: "1.25rem",
                                                }}
                                            />
                                            <span>Địa điểm làm việc:</span>
                                        </InfoLabel>
                                        <InfoText>HCM</InfoText>
                                    </InfoItem>
                                </InfoGrid>
                            </div>
                            <BadgeRight>Chuyên viên kinh nghiệm</BadgeRight>
                        </AvatarContainer>
                        <MenuContainer>
                            <Menu>
                                {listMenu.map((menu) => (
                                    <MenuItem
                                        key={menu.id}
                                        active={activeMenu === menu.id}
                                        onClick={() => setActiveMenu(menu.id)}
                                    >
                                        {menu.title}
                                    </MenuItem>
                                ))}
                            </Menu>
                            <div>{renderDetailMenu()}</div>
                        </MenuContainer>
                    </MainContent>
                    <Sidebar>
                        <PriceCard>
                            <PriceInfo>
                                <Receipt
                                    style={{
                                        stroke: "#3b82f6",
                                        width: "1.25rem",
                                        height: "1.25rem",
                                    }}
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <span>Giá tiền:</span>
                                    <strong>Chỉ từ 500.000 VNĐ</strong>
                                </div>
                            </PriceInfo>
                            <StyledButton>
                                <Zap style={{ stroke: "#fff", fill: "#fff" }} />
                                <span>Đặt lịch</span>
                            </StyledButton>
                        </PriceCard>
                        <WorkScheduleCard>
                            <WorkScheduleHeader>
                                <h2
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "2rem",
                                    }}
                                >
                                    Lịch làm việc
                                </h2>
                            </WorkScheduleHeader>
                            <ScheduleList>
                                {workSchedule.map((schedule, index) => (
                                    <ScheduleItem key={index}>
                                        <h2>{schedule.day}</h2>
                                        <p>{schedule.hours}</p>
                                    </ScheduleItem>
                                ))}
                            </ScheduleList>
                        </WorkScheduleCard>
                    </Sidebar>
                </GridLayout>
            </Container>
        </BasePage>
    );
}
