"use client";

import { useEffect, useRef, useState } from "react";
import { Skill } from "../page";
import Modal from "../preset/Modal";

export default function Home() {
    const [skillModal, setSkillModal] = useState<Skill | null>(null)
    const [page, setPageStatus] = useState(0);
    const pageRef = useRef(page);
    const infoes = ['메인', '역할', '배포 자동화', '무중단 배포','클라우드 스토리지']

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
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >회사 커뮤니케이션 및 협업 도구 (HoneyBadger)</div>
                    <div className="flex w-full h-[70%] flex-col">
                        <div className="self-end text-xs">
                            2024-07-01~ 2024-08-09 (40일)
                        </div>
                        <div className="w-full mb-6 flex flex-col items-center border-gray-300 border-4">
                            <label className="text-center text-2xl font-bold p-2">목표</label>
                            <div className="border-gray-300 border-t-4 w-full"></div>
                            <div className="p-4 text-xl">
                                전반적인 회사에서 운용 가능한 협업 사이트 제작
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="w-[66%] flex flex-col items-center border-gray-300 border-4">
                                <label className="text-center text-2xl font-bold p-2">주요 기능</label>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="px-4 w-full flex">
                                    <div className="w-[50%]">
                                        <ul className="font-bold">비회원 기능</ul>
                                        <li>문의 페이지 (회원/로그인 관련된 문의, 비밀 글 기능, 검색 기능)</li>

                                        <ul className="font-bold mt-4">회원 기능</ul>
                                        <li>마이 페이지 (프로필 기능, 명함 자동생성/다운로드)</li>

                                        <ul className="font-bold mt-4">인사 기능</ul>
                                        <li>인사 관리 페이지</li>
                                        <li>문의 페이지 (문의사항 답변 기능)</li>
                                        <li>부서 생성 기능</li>

                                        <ul className="font-bold mt-4">채팅 기능</ul>
                                        <li>채팅 방 생성(1:1/1:N 구성, 방 이름 지정)</li>
                                        <li>읽기 기능</li>
                                        <li>메시지 송신(채팅, 이미지, 링크, 파일)</li>
                                        <li>예약 메시지 기능</li>
                                        <li>채팅방 나가기</li>

                                    </div>
                                    <div className="w-[50%]">
                                        <ul className="font-bold">메일 기능</ul>
                                        <li>메일 송신 기능</li>
                                        <li>예약 메일 기능</li>
                                        <li>메일 보관함 (받은 메일 / 보낸 메일 / 예약 메일)</li>
                                        <li>예약 메일 수정 기능</li>
                                        <li>메일 읽기 기능(읽은 / 읽지 않은 메일 표기)</li>

                                        <ul className="font-bold mt-4">결재 기능</ul>
                                        <li>결재 작성 기능</li>
                                        <li>결재 상태 처리(결재 대기/ 중 / 허가 / 반환)</li>
                                        <li>내용 검색 기능</li>
                                        <li>결재 전달 기능(참조인 추가 삭제)</li>

                                        <ul className="font-bold mt-4">일정 기능</ul>
                                        <li>일정 생성 기능(제목, 내용, 태그, 시작 및 종료시간, 색상)</li>
                                        <li>그룹 기능(그룹 전체 공지되는 일정 생성 기능)</li>
                                        <li>일정 타이머 기능</li>
                                        <li>필터 기능(태그별, 개인/그룹별)</li>


                                    </div>
                                </div>
                                <div className="w-full px-4 pb-4">
                                    <ul className="font-bold">저장소 기능</ul>
                                    <li>저장소 기능</li>
                                    <li>파일 업로드 기능(파일 복수 및 폴더 단위 업로드 기능)</li>
                                </div>
                            </div>
                            <div className="ml.auto w-[33%] flex flex-col items-center border-gray-300 border-4">
                                <label className="text-center text-2xl font-bold p-2">설계/프로세스</label>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 w-full flex flex-col">
                                    <li>팀원 구성 : 총 5명</li>
                                    <li>개발 환경 : Windows10 Pro</li>
                                    <li>개발 도구 : IntelliJ, SQLyog, VSCode</li>
                                    <li>형상 관리 도구 : Github</li>
                                    <li>개발 언어 : Java, HTML/CSS, JavaScript</li>
                                    <li>프레임 워크 : Spring Boot, Next.js, Tailwind, DaisyUI</li>
                                    <li>라이브러리 : Axios, SocketJS, Quill Editor</li>
                                    <li>소켓 : STOMP</li>
                                    <li>서버 환경 : Ubuntu 24.04 LTS</li>
                                    <li>DB : MySQL</li>
                                    <li>배포 : Docker와 Github Action을 이용한 무중단 자동화 배포</li>
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
                                    <li>Docker 및 Github Action</li>
                                    <li>무중단 배포</li>
                                    <li>저장소 기능</li>
                                    <li>인사기능</li>
                                    <li>문의기능(비회원)</li>
                                    <li>회원기능</li>
                                </div>
                            </div>
                            <div className="border-gray-300 border-4">
                                <div className="text-center text-2xl font-bold p-2 flex justify-center items-center"><img src="/person.png" alt="person" className="w-[1.8rem] h-[1.8rem]" />한성언(팀원)</div>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 text-xl">
                                    <li>이메일(FE)</li>
                                    <li>일정(BE)</li>
                                </div>
                            </div>
                            <div className="border-gray-300 border-4">
                                <div className="text-center text-2xl font-bold p-2 flex justify-center items-center"><img src="/person.png" alt="person" className="w-[1.8rem] h-[1.8rem]" />남도원(팀원)</div>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 text-xl">
                                    <li>채팅(FE)</li>
                                    <li>결재(BE)</li>
                                </div>
                            </div>
                            <div className="border-gray-300 border-4">
                                <div className="text-center text-2xl font-bold p-2 flex justify-center items-center"><img src="/person.png" alt="person" className="w-[1.8rem] h-[1.8rem]" />김태훈(팀원)</div>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 text-xl">
                                    <li>이메일(BE)</li>
                                    <li>일정(FE)</li>
                                </div>
                            </div>
                            <div className="border-gray-300 border-4">
                                <div className="text-center text-2xl font-bold p-2 flex justify-center items-center"><img src="/person.png" alt="person" className="w-[1.8rem] h-[1.8rem]" />이지영(팀원)</div>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 text-xl">
                                    <li>채팅(BE)</li>
                                    <li>결재(FE)</li>
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
                            <Icon name='Docker' url='/docker.png' color='#129fdb' description='리눅스의 응용 프로그램들을 프로세스 격리 기술들을 사용해 컨테이너로 실행하고 관리하는 오픈 소스 프로젝트이다.' has='Github Action을 이용한 무중단 배포 환경 구축이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EB%8F%84%EC%BB%A4_(%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4)' />
                        </div>

                    </div>
                </div>
            case 2:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >빌드 자동화</div>
                    <div className="flex h-[70%] w-full flex-col">
                        <img src="/docker_structure.png" alt="docker_structure" className="peer" />
                        <div className="absolute w-full -translate-y-1/2 top-[50%] -translate-x-1/2 left-[50%] hover:opacity-100 peer-hover:opacity-100 opacity-0 bg-white p-4 flex justify-center flex flex-col border-2 rounded-lg">
                            <label className="self-center text-xl font-bold mt-2">Docker 란?</label>
                            <label>애플리케이션을 신속하게 구축, 테스트 및 배포할 수 있는 소프트웨어 플랫폼</label>
                            <label className="self-center text-xl font-bold mt-2">Github Action 이란?</label>
                            <label>리포지토리에서 바로 소프트웨어 개발 워크플로를 자동화, 사용자 지정 및 실행하는 기능</label>
                        </div>
                    </div>
                </div>
            case 3:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >무중단 배포</div>
                    <div className="flex h-[70%] w-full flex-col relative">
                        <img src="/non_stop.png" className="cursor-pointer peer" alt="non_stop" />
                        <div className="absolute w-full -translate-y-1/2 top-[50%] -translate-x-1/2 left-[50%] hover:opacity-100 peer-hover:opacity-100 opacity-0 bg-white p-4 flex justify-center flex flex-col border-2 rounded-lg">
                            <label className="self-center text-xl font-bold mt-2">Actuator 란?</label>
                            <label>스프링부트 라이브러리로, 스프링부트가 실행시 설정한 url을 통하여 status가 up으로 변합니다.</label>
                            <label className="self-center text-xl font-bold mt-2">NextJs는 고려하지 않는 이유</label>
                            <label>각 페이지마다 로딩 시간이 필요한 대신 압도적으로 실행시간이 빠른 Next.js는 스프링부트보다 빠르게 켜지기 때문</label>
                            <label className="self-center text-xl font-bold mt-2">동작 순서</label>
                            <ul className="list-decimal">
                                <li>업데이트 된 도커 이미지 당기기(pull)</li>
                                <li>서브 서버를 먼저 실행</li>
                                <li>Actuator를 통하여 서브 서버를 실행 체크</li>
                                <li>서브 서버가 완전 실행시 기존 메인 서버 종료</li>
                                <li>포트를 서브 서버를 바라보게 수정하고 업데이트된 메인 서버 실행</li>
                                <li>서브 서버와 마찬가지로 메인서버 완전 실행시 포트 수정 및 서브 서브 종료</li>
                            </ul>
                        </div>
                    </div>
                </div>
            case 4:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >클라우드 스토리지(stream)</div>
                    <div className="flex h-[70%] w-full flex-col relative">
                        <img src="/stream.png" className="cursor-pointer peer" alt="stream" />
                        <div className="absolute w-full -translate-y-1/2 top-[50%] -translate-x-1/2 left-[50%] hover:opacity-100 peer-hover:opacity-100 opacity-0 bg-white p-4 flex justify-center flex flex-col border-2 rounded-lg">
                            <label className="self-center text-xl font-bold mt-2">클라우드 스토리지란?</label>
                            <label>디지털 데이터를 클라우드 서버에 저장하여 어디서든 접근 가능하도록 하는 스토리지</label>
                            <label className="self-center text-xl font-bold mt-2">stream 통신</label>
                            <label>파일을 한번에 보내는 것에는 제한이 있고, 해당 제한을 바꿀 수 있으나 버퍼적인 문제 등이 발생함</label>
                            <label>따라서 byte형태로 파일을 쪼개서 보내어 파일을 합치는 방식으로 통신</label>
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