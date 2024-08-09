"use client";

import { useEffect, useRef, useState } from "react";
import { Skill } from "../page";
import Modal from "../preset/Modal";

export default function Home() {
    const [skillModal, setSkillModal] = useState<Skill | null>(null)
    const [page, setPageStatus] = useState(0);
    const pageRef = useRef(page);
    const infoes = ['메인', '역할', 'JWT 로그인', '소셜 로그인']

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
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >소셜 네트워크 서비스 사이트 (Social)</div>
                    <div className="flex w-full h-[70%] flex-col">
                        <div className="self-end text-xs">
                            2024-05-08 ~ 2024-05-31 (24일)
                        </div>
                        <div className="w-full mb-6 flex flex-col items-center border-gray-300 border-4">
                            <label className="text-center text-2xl font-bold p-2">목표</label>
                            <div className="border-gray-300 border-t-4 w-full"></div>
                            <div className="p-4 text-xl">
                                대표적인 소셜 네트워크 서비스인 인스타그램을 모티브로 삼아, 프론트엔드 프레임워크인 Next.js를 활용하여 서버 측의 부담을 일부 경감하는 서비스 사이트를 구축하는 것입니다. 이를 통해 사용자에게 빠르고 원활한 경험을 제공하며, 효율적인 데이터 처리를 통해 서버의 부담을 줄이고 성능을 최적화하는 것을 목표
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="w-[47.5%] flex flex-col items-center border-gray-300 border-4">
                                <label className="text-center text-2xl font-bold p-2">주요 기능</label>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 w-full">
                                    <ul className="font-bold">회원 기능</ul>
                                    <li>로그인, 회원가입 기능</li>
                                    <li>팔로우, 팔로워 기능</li>
                                    <li>탐색 (전체적인 게시글 탐색 기능)</li>


                                    <ul className="font-bold mt-4">게시글 기능</ul>
                                    <li>이미지 등록</li>
                                    <li>내용 작성</li>
                                    <li>태그 기능</li>
                                    <li>공개 범위 설정</li>
                                    <li>좋아요 및 댓글 기능</li>


                                    <ul className="font-bold mt-4">채팅 기능</ul>
                                    <li>개인(1:1) 채팅 기능</li>
                                    <li>그룹(1:N) 채팅 기능</li>
                                </div>
                            </div>
                            <div className="ml.auto w-[47.5%] flex flex-col items-center border-gray-300 border-4">
                                <label className="text-center text-2xl font-bold p-2">설계/프로세스</label>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 w-full flex flex-col">
                                    <li>팀원 구성 : 총 1명</li>
                                    <li>개발 환경 : Windows10 Pro</li>
                                    <li>개발 도구 : IntelliJ, SQLyog, VSCode</li>
                                    <li>형상 관리 도구 : Github</li>
                                    <li>개발 언어 : Java, HTML/CSS, JavaScript</li>
                                    <li>프레임 워크 : Spring Boot, Next.js, Tailwind, DaisyUI</li>
                                    <li>라이브러리 : Axios, SocketJS</li>
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
                        <div className="w-full mb-6">
                            <div className="border-gray-300 border-4">
                                <div className="text-center text-2xl font-bold p-2">홍성재</div>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 text-xl">
                                    <li>서버 환경 구축</li>
                                    <li>배포 설정</li>
                                    <li>프론트엔드</li>
                                    <li>백엔드</li>
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
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >JWT(JSON Web Token)</div>
                    <div className="flex h-[70%] w-full flex-col">
                        <img src="/jwt.png" alt="jwt" />
                        <div className="absolute w-full -translate-y-1/2 top-[50%] -translate-x-1/2 left-[50%] hover:opacity-100 peer-hover:opacity-100 opacity-0 bg-white p-4 flex justify-center flex flex-col border-2 rounded-lg">
                            <label className="self-center text-xl font-bold mt-2">JWT 사용 이유</label>
                            <label>로그인 정보를 더 이상 백엔드 서버인 스프링부트에서 관리하지않고, 프론트엔드 서버에서 같이 관리하기 때문입니다.</label>
                            <label className="self-center text-xl font-bold mt-2">동작 방식</label>
                            <ul className="list-decimal px-6">
                                <li>아이디와 비밀번호를 입력합니다.</li>
                                <li>클라이언트에서 데이터를 송신합니다.</li>
                                <li>입력한 정보가 맞는 경우 토큰을 생성합니다.</li>
                                <li>생성된 토큰을 돌려받고 저장합니다.</li>
                                <li>제한된 리소스에 접근을 시도합니다.</li>
                                <li>토큰과 함께 요청을 보냅니다.</li>
                                <li>토근으로부터 유저를 확인합니다.</li>
                                <li>입력한 유저가 접근 가능한 경우 정보를 응답합니다.</li>
                            </ul>


                        </div>
                    </div>
                </div>
            case 3:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >OAuth (Open Authorization) With JWT</div>
                    <div className="flex h-[70%] w-full flex-col relative">
                        <img src="/oauth.png" className="cursor-pointer peer" alt="oauth" />
                        
                        <div className="absolute w-full -translate-y-1/2 top-[50%] -translate-x-1/2 left-[50%] hover:opacity-100 peer-hover:opacity-100 opacity-0 bg-white p-4 flex justify-center flex flex-col border-2 rounded-lg">
                            <label className="self-center text-xl font-bold mt-2">OAuth 란?</label>
                            <label>인터넷 사용자들이 비밀번호를 제공하지 않고 다른 웹사이트 상의 자신들의 정보에 대해 웹사이트나 애플리케이션의 접근 권한을 부여할 수 있는 공통적인 수단으로서 사용되는, 접근 위임을 위한 개방형 표준</label>
                            <label className="self-center text-xl font-bold mt-2">동작 순서</label>
                            <ul className="list-decimal pl-4">
                                <li>소셜 로그인 주소로 이동</li>
                                <li>소셜 로그인</li>
                                <li>사이트로부터 코드 획득</li>
                                <li>code 백엔드 서버로 전송</li>
                                <li>서버에서 code를 통하여 Social AccessToken 획득</li>
                                <li>AccessToken을 통하여 소셜 계정 정보 획득</li>
                                <li>정보를 통하여 아이디 찾기(없을 경우 자동 생성)</li>
                                <li>아이드를 통하여 JWT 토큰 발행</li>
                            </ul>
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