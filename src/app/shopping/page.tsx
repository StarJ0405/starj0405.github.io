"use client";

import { useEffect, useRef, useState } from "react";
import { Skill } from "../page";
import Modal from "../preset/Modal";

export default function Home() {
    const [skillModal, setSkillModal] = useState<Skill | null>(null)
    const [page, setPageStatus] = useState(0);
    const pageRef = useRef(page);
    const infoes = ['메인', '역할', '시스템 설계도', 'rest_api', 'ssr+csr', '스케쥴링']

    const delayInterval = useRef(null as any);
    const isDelay = useRef(false);



    useEffect(() => {
        const handelr = (e: KeyboardEvent) => {

            if (e.key == "ArrowUp" || e.key == "ArrowLeft")
                setPage(Math.max(0, pageRef.current - 1))
            else if (e.key == "ArrowDown" || e.key == "ArrowRight")
                setPage(Math.min(infoes.length - 1, pageRef.current + 1));
            else if (e.key == "Home" || e.key == "PageUp")
                setPage(0, true);
            else if (e.key == "End" || e.key == "PageDown")
                setPage(infoes.length - 1, true);
            else if (Number(e.key) > 0 && Number(e.key) <= infoes.length)
                setPage(Number(e.key) - 1, true);
        }
        window.addEventListener('keydown', handelr);

        return () => window.removeEventListener('keydown', handelr);
    }, [])
    function setPage(page: number, force?: boolean) {
        if (force) {
            if (delayInterval.current)
                clearInterval(delayInterval.current);
            isDelay.current = false;
        }
        if (isDelay.current)
            return;
        setPageStatus(page);
        pageRef.current = page;
        isDelay.current = true;
        const interval = setInterval(() => { isDelay.current = false; clearInterval(interval) }, 100);
        delayInterval.current = interval;
    }
    function Icon(props: Skill) {
        return <div key={props.name} className='group relative p-4 rounded-full flex items-center justify-center border-4 w-[10rem] h-[10rem] m-3 cursor-pointer' style={{ borderColor: props.color }} onClick={() => setSkillModal(props)}>
            <img src={props.url} alt={props.name} className='w-[9rem] h-[7.5rem]' />
            <div className='absolute -top-1 -left-1 rounded-full transition-all ease-in-out duration-400 opacity-0 group-hover:opacity-60 w-[10rem] h-[10rem]' style={{ background: props.color + ' 10%' }}></div>
            <div className='absolute -top-1 -left-1 rounded-full z-[1] transition-all ease-in-out duration-400 opacity-0 group-hover:opacity-100 flex items-center justify-center text-2xl text-white w-[10rem] h-[10rem] font-bold'>{props.name}</div>
            <img src='/click.png' alt='click' className='absolute -right-6 -bottom-6 w-[4rem] h-[4rem] transition-all ease-in-out duration-400 opacity-0 group-hover:opacity-50' />
        </div>
    }
    function Page() {
        switch (page) {
            case 0:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >전자상거래 소매 중개업 사이트 (ShoppingMall)</div>
                    <div className="flex w-full h-[70%] flex-col">
                        <div className="self-end text-xs">
                            2024-06-03 ~ 2024-06-27 (25일)
                        </div>
                        <div className="w-full mb-6 flex flex-col items-center border-gray-300 border-4">
                            <label className="text-center text-2xl font-bold p-2">목표</label>
                            <div className="border-gray-300 border-t-4 w-full"></div>
                            <div className="p-4 text-xl">
                                물품을 등록하고 판매를 대행하여 구매 시도할 수 있는 사이트
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="w-[66%] flex flex-col items-center border-gray-300 border-4">
                                <label className="text-center text-2xl font-bold p-2">주요 기능</label>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 w-full flex">
                                    <div className="w-[55%]">
                                        <ul className="font-bold">비회원 기능</ul>
                                        <li>로그인이 필요한 기능을 제외한 전반적인 View 기능</li>

                                        <ul className="font-bold mt-4">회원 기능</ul>
                                        <li>로그인, 회원가입, 비밀번호 찾기 기능</li>
                                        <li>구매 기록</li>
                                        <li>최근 본 상품</li>
                                        <li>추천 상품</li>
                                        <li>내 리뷰 보기</li>
                                        <li>상품 구매(결제 연동 X)</li>
                                        <li>장바구니 기능</li>
                                        <li>배송지 저장 기능</li>
                                        <li>상품 QA 기능</li>
                                        <li>상품 찜 기능</li>
                                    </div>
                                    <div className="w-[45%]">
                                        <ul className="font-bold">판매자 기능</ul>
                                        <li>상품 등록</li>
                                        <li>옵션별 추가 금액 기능</li>
                                        <li>할인 이벤트 설정</li>
                                        <li>문의사항 채팅 기능(1:1 채팅)</li>

                                        <ul className="font-bold mt-4">관리자 기능</ul>
                                        <li>공지사항</li>
                                        <li>고객센터 문의사항 채팅 기능(1:1 채팅)</li>

                                        <ul className="font-bold mt-4">검색 기능</ul>
                                        <li>키워드 검색 기능</li>
                                        <li>정렬 기능</li>
                                        <li>카테고리 별 검색 기능</li>
                                    </div>
                                </div>
                            </div>

                            <div className="ml.auto w-[33%] flex flex-col items-center border-gray-300 border-4">
                                <label className="text-center text-2xl font-bold p-2">설계/프로세스</label>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 w-full flex flex-col">
                                    <li>팀원 구성 : 총 4명</li>
                                    <li>개발 환경 : Windows10 Pro</li>
                                    <li>개발 도구 : IntelliJ, SQLyog, VSCode</li>
                                    <li>형상 관리 도구 : Github</li>
                                    <li>개발 언어 : Java, HTML/CSS, JavaScript</li>
                                    <li>프레임 워크 : Spring Boot, Next.js, Tailwind, DaisyUI</li>
                                    <li>라이브러리 : Axios, SocketJS, Quill Editor</li>
                                    <li>소켓 : STOMP</li>
                                    <li>서버 환경 : Ubuntu 24.04 LTS</li>
                                    <li>DB : MySQL</li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            case 1:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >팀원구성 및 기술과 환경</div>
                    <div className="flex h-[70%] w-full flex-col">
                        <div className="w-full mb-6 flex justify-evenly">
                            <div className="border-gray-300 border-4">
                                <div className="text-center text-2xl font-bold p-2 flex justify-center items-center"><img src="/leader.png" alt="leader" className="w-[1.8rem] h-[1.8rem]" />홍성재(팀장)</div>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 text-xl">
                                    <li>서버 환경 구축</li>
                                    <li>배포 설정</li>
                                    <li>프론트엔드 전체</li>
                                    <label className="font-bold">백엔드 기능</label>
                                    <li>채팅</li>
                                    <li>알림</li>
                                </div>
                            </div>
                            <div className="border-gray-300 border-4">
                                <div className="text-center text-2xl font-bold p-2 flex justify-center items-center"><img src="/person.png" alt="person" className="w-[1.8rem] h-[1.8rem]" />황준하(팀원)</div>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 text-xl">
                                    <label className="font-bold">백엔드 담당</label>
                                    <li>상품 CRUD</li>
                                    <li>리뷰</li>
                                    <li>최근 상품</li>
                                    <li>이미지 처리</li>
                                    <li>카테고리</li>
                                </div>
                            </div>
                            <div className="border-gray-300 border-4">
                                <div className="text-center text-2xl font-bold p-2 flex justify-center items-center"><img src="/person.png" alt="person" className="w-[1.8rem] h-[1.8rem]" />이순재(팀원)</div>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 text-xl">
                                    <label className="font-bold">백엔드 담당</label>
                                    <li>할인 이벤트(스케쥴링)</li>
                                    <li>장바구니</li>
                                    <li>최근 상품</li>
                                    <li>검색 기능</li>
                                </div>
                            </div>
                            <div className="border-gray-300 border-4">
                                <div className="text-center text-2xl font-bold p-2 flex justify-center items-center"><img src="/person.png" alt="person" className="w-[1.8rem] h-[1.8rem]" />이동원(팀원)</div>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 text-xl">
                                    <label className="font-bold">백엔드 담당</label>
                                    <li>비밀번호 변경</li>
                                    <li>게시글 CRUD</li>
                                    <li>프로필 페이지</li>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex h-[70%] w-full flex-col">

                        <div className="border-gray-300 border-4 rounded-xl flex flex-wrap w-full h-[30rem] items-center">
                            <Icon name='HTML' url='/html.png' color='#D44D26' description='하이퍼 텍스트 마크업 언어는 웹 페이지 표시를 위해 개발된 지배적인 마크업 언어이다.' has='HTML 태그와 선택자를 활용한 웹 디자인이 가능합니다.' link='https://ko.wikipedia.org/wiki/HTML' />
                            <Icon name='CSS' url='/css.png' color='#264DE4' description='종속형 시트 또는 캐스케이딩 스타일 시트는 마크업 언어가 실제 표시되는 방법을 기술하는 스타일 언어이다.' has='CSS를 활용한 웹 디자인이 가능합니다.' link='https://ko.wikipedia.org/wiki/CSS' />
                            <Icon name='JavaScript' url='/js.png' color='#E7A42B' description='객체 기반의 스크립트 프로그래밍 언어이다. 이 언어는 웹 브라우저 내에서 주로 사용된다.' has='DOM 문법을 이해하고 활용이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8' />
                            <Icon name='Java' url='/java.png' color='#F8582A' description='썬 마이크로시스템즈의 제임스 고슬링(James Gosling)과 다른 연구원들이 개발한 객체 지향적 프로그래밍 언어이다.' has='객체지향 구조를 이해하고 활용이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94_(%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D_%EC%96%B8%EC%96%B4)' />
                            <Icon name='Next.js' url='/nextjs.png' color='#000000' description='서버 사이드 렌더링, 정적 웹 페이지 생성 등 리액트 기반 웹 애플리케이션 기능들을 가능케 하는 Node.js 위에서 빌드된 오픈 소스 웹 개발 프레임워크이다.' has='SSR과 CSR을 활용하여 페이지 구성이 가능합니다.' link='https://ko.wikipedia.org/wiki/Next.js' />
                            <Icon name='Spring Boot' url='/springboot.png' color='#6CB33E' description='최소한의 노력으로 독립 실행형 프로덕션 등급 Spring 기반 애플리케이션을 프로그래밍하는 데 사용되는 오픈 소스 Java 프레임워크이다.' has='JPA와 QueryDSL 및 RestAPI 구성이 가능합니다.' link='https://en.wikipedia.org/wiki/Spring_Boot' />
                            <Icon name='MySQL' url='/mysql.png' color='#00818a' description='세계에서 가장 많이 쓰이는 오픈 소스의 관계형 데이터베이스 관리 시스템으로 다중 스레드, 다중 사용자, 구조질의어 형식의 데이터베이스 관리 시스템으로 오라클이 관리 및 지원하고 있다.' has='ERD작성과 CRUD 활용이 가능합니다.' link='https://ko.wikipedia.org/wiki/MySQL' />
                            <Icon name='Ubuntu' url='/ubuntu.png' color='#DE4814' description='영국 기업 캐노니컬이 개발, 배포하는 컴퓨터 운영 체제이다. 데비안 리눅스를 기반으로 개발되며, 데비안에 비해 사용자 편의성에 초점을 맞춘 리눅스 배포판이다.' has='배포를 위한 환경 구축이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EC%9A%B0%EB%B6%84%ED%88%AC' />
                            <Icon name='NodeJS' url='/nodejs.png' color='#41893e' description='크로스플랫폼 오픈소스 자바스크립트 런타임 환경으로 윈도우, 리눅스, macOS 등을 지원한다.' has='형상관리를 위한 활용이 가능합니다.' link='https://ko.wikipedia.org/wiki/Node.js' />
                            <Icon name='Git' url='/git.png' color='#f05033' description='컴퓨터 파일의 변경사항을 추적하고 여러 명의 사용자들 간에 해당 파일들의 작업을 조율하기 위한 스냅샷 스트림 기반의 분산 버전 관리 시스템이다.' has='Github Action과 협업을 위한 PR 사용이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EA%B9%83_(%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4)' />
                        </div>

                    </div>
                </div>
            case 2:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >시스템 설계도</div>
                    <div className="flex h-[70%] w-full flex-col">
                        <img src="/shopping_structure.png" alt="shopping_structure" />
                    </div>
                </div>
            case 3:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >REST(Representational State Transfer) API</div>
                    <div className="flex h-[70%] w-full flex-col relative">
                        <img src="/rest_api.png" className="cursor-pointer peer" alt="rest_api" />
                        <div className="absolute w-full -translate-y-1/2 top-[50%] -translate-x-1/2 left-[50%] hover:opacity-100 peer-hover:opacity-100 opacity-0 bg-white p-4 flex justify-center flex flex-col border-2 rounded-lg">
                            <label className="self-center text-xl font-bold mt-2">RestAPI 사용 이유</label>
                            <label>프론트 서버와 백엔드서버가 원활하게 서로 데이터를 교환하게 위해서 사용했습니다.</label>
                            <label className="self-center text-xl font-bold mt-2">명세서</label>
                            <label>Google Sheet를 사용하여 명세서를 작성 후 프로그램을 진행하였습니다.</label>
                            <div className="flex">
                                <img src="/api1.png" className="w-[400px] m-2 border-2" />
                                <img src="/api2.png" className="h-[200px] m-2 border-2"/>
                            </div>

                        </div>
                    </div>
                </div>
            case 4:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >SSR & CSR(Server & Client Side Rendering)</div>
                    <div className="flex h-[70%] w-full flex-col relative">
                        <img src="/ssr+csr.png" className="cursor-pointer peer" alt="ssr+csr" />
                        <div className="absolute w-full -translate-y-1/2 top-[50%] -translate-x-1/2 left-[50%] hover:opacity-100 peer-hover:opacity-100 opacity-0 bg-white p-4 flex justify-center flex flex-col border-2 rounded-lg">
                            <label className="self-center text-xl font-bold mt-2">SSR 란?</label>
                            <label>서버에서 먼저 렌더링하여 완전한 HTML을 클라이언트에 제공하는 기술</label>
                            <label>배포시 클라이언트의 부담이 줄고, 속도가 빠르지만 정적인 데이터를 제공</label>
                            <label className="self-center text-xl font-bold mt-2">CSR 란?</label>
                            <label>클라이언트에서 실질적으로 비어있는 태그들을 받고 자바스크립트를 해석하여 view를 만들어내는 기술</label>
                            <label>비어있는 데이터와 데이터를 해석하는 사이의 공백의 시간이 존재하나 동적인 데이터를 제공</label>
                        </div>
                    </div>
                </div>
            case 5:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >스케쥴링</div>
                    <div className="flex h-[70%] w-full flex-col relative">
                        <img src="/schedule.png" className="cursor-pointer peer" alt="schedule" />
                        <div className="absolute w-full -translate-y-1/2 top-[50%] -translate-x-1/2 left-[50%] hover:opacity-100 peer-hover:opacity-100 opacity-0 bg-white p-4 flex justify-center flex flex-col border-2 rounded-lg">
                            <label className="self-center text-xl font-bold mt-2">yolo 사용 이유</label>
                            <label>움직이는 레일 위에서 물체 찾고 해당 물체의 위치를 특정하여 물체의 이미지 데이터를 확보하기 위해 사용했습니다.</label>
                            <label className="self-center text-xl font-bold mt-2">V8 선택 이유</label>
                            <label>레일 위에서 측정을 하기위해서는 빠르고 가벼운 모델이 필요했으며, 그 중에서도 가장 정확도가 높아야했습니다.</label>
                            <label>목적에 가장 적합한 버전은 V8으로 판단하여 YoloV8을 선정했습니다.</label>
                        </div>
                    </div>
                </div>
            default:
                return <></>
        }
    }


    return <main className="w-screen h-screen flex flex-col items-center justify-center relative" onWheel={e => {
        if (e.deltaY > 0)
            setPage(Math.min(infoes.length - 1, page + 1));
        else if (e.deltaY < 0)
            setPage(Math.max(0, page - 1))

    }}>
        <div className="w-full h-full flex flex-col items-center justify-center">
            <Page key={"page"} />
            <Modal open={skillModal != null} onClose={() => setSkillModal(null)} escClose={true} outlineClose={true} className='rounded-2xl'>
                <div className='w-[40rem] h-[20rem] flex items-center'>

                    <img src={skillModal?.url} alt={skillModal?.name} className='w-[15rem] h-[15rem] m-4' />

                    <div className='divider divider-horizontal mx-0' />
                    <div className='flex flex-col h-full w-full'>
                        <div className={'w-full p-4 flex flex-col justify-between' + (skillModal?.has ? ' border-b-2' : '')} style={{ height: skillModal?.has ? '50%' : '100%' }}>
                            <label>{skillModal?.description}</label>
                            {skillModal?.link ?
                                <a className='self-end hover:underline' href={skillModal?.link} onMouseEnter={e => (e.target as HTMLElement).style.color = skillModal?.color as string} onMouseLeave={e => (e.target as HTMLElement).style.color = ''}>위키백과</a>
                                : <></>}
                        </div>
                        {skillModal?.has ? <div className='h-[50%] w-full p-4 font-bold'>{skillModal?.has}</div> : <></>}
                    </div>
                </div>
            </Modal>
        </div>
        <div className="absolute right-10 flex flex-col">
            {infoes.map((info, index) => <button key={index} className="group relative flex items-center outline-none" onClick={() => setPage(index, true)}>
                <div className="group-hover:block hidden absolute right-5 flex items-center z-[1] bg-white rounded-lg p-1" style={{ width: info.length + ".5rem" }}>{info}</div>
                {index == page ? '●' : '○'}
            </button>)}
        </div>

    </main>
}