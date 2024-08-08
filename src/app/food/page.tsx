"use client";

import { useEffect, useRef, useState } from "react";
import { Skill } from "../page";
import Modal from "../preset/Modal";

export default function Home() {
    const [skillModal, setSkillModal] = useState<Skill | null>(null)
    const [page, setPageStatus] = useState(0);
    const pageRef = useRef(page);
    const infoes = ['메인', '역할', '데이터', 'SVD']

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
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >레시피 공유 플랫폼 (Food Recipe)</div>
                    <div className="flex w-full h-[70%] flex-col">
                        <div className="self-end text-xs">
                            2024-04-03 ~ 2024-05-07 (35일)
                        </div>
                        <div className="w-full mb-6 flex flex-col items-center border-gray-300 border-4">
                            <label className="text-center text-2xl font-bold p-2">목표</label>
                            <div className="border-gray-300 border-t-4 w-full"></div>
                            <div className="p-4 text-xl">
                                자신의 레시피를 공유하고 레시피에 들어간 재료들의 평균적인 영양소 및 칼로리를 제공하도록 구현하는 것
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="w-[47.5%] flex flex-col items-center border-gray-300 border-4">
                                <label className="text-center text-2xl font-bold p-2">주요 기능</label>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 w-full">
                                    <ul className="font-bold">회원 기능</ul>
                                    <li>로그인, 회원가입 기능</li>
                                    <li>소셜 로그인 기능</li>

                                    <ul className="font-bold mt-4">관리자 기능</ul>
                                    <li>카테고리 및 요리 도구 등 정보 입력 및 추가 기능</li>
                                    <li>재료 입력 기능 (영양소 및 칼로리 등)</li>

                                    <ul className="font-bold mt-4">게시글(레시피) 기능</ul>
                                    <li>조리 방법, 재료, 요리 도구, 태그 등록</li>
                                    <li>레시피 검색 기능</li>
                                    <li>재료 기반 레시피 찾기</li>
                                    <li>평점 시스템</li>


                                    <ul className="font-bold mt-4">추천 시스템</ul>
                                    <li>머신러닝으로 유저의 예측된 평점을 기준으로 목록 표시</li>
                                </div>
                            </div>
                            <div className="ml.auto w-[47.5%] flex flex-col items-center border-gray-300 border-4">
                                <label className="text-center text-2xl font-bold p-2">설계/프로세스</label>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 w-full flex flex-col">
                                    <li>팀원 구성 : 총 1명</li>
                                    <li>개발 환경 : Windows10 Pro</li>
                                    <li>개발 도구 : IntelliJ, SQLyog</li>
                                    <li>형상 관리 도구 : Github</li>
                                    <li>개발 언어 : Java, HTML/CSS</li>
                                    <li>프레임 워크 : Spring Boot, Tailwind, DaisyUI</li>
                                    <li>라이브러리 : Axios</li>
                                    <li>서버 환경 : Ubuntu 24.04 LTS</li>
                                    <li>DB : MySQL</li>
                                    <li>모델 : surprise 라이브러리의 SVD 모델</li>
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
                                    <li>백엔드</li>
                                    <li>기계학습</li>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex h-[70%] w-full flex-col">
                        <div className="border-gray-300 border-4 rounded-xl flex flex-wrap w-full h-[30rem] items-center">
                            <Icon name='HTML' url='/html.png' color='#D44D26' description='하이퍼 텍스트 마크업 언어는 웹 페이지 표시를 위해 개발된 지배적인 마크업 언어이다.' has='HTML 태그와 선택자를 활용한 웹 디자인이 가능합니다.' link='https://ko.wikipedia.org/wiki/HTML' />
                            <Icon name='CSS' url='/css.png' color='#264DE4' description='종속형 시트 또는 캐스케이딩 스타일 시트는 마크업 언어가 실제 표시되는 방법을 기술하는 스타일 언어이다.' has='CSS를 활용한 웹 디자인이 가능합니다.' link='https://ko.wikipedia.org/wiki/CSS' />
                            <Icon name='Java' url='/java.png' color='#F8582A' description='썬 마이크로시스템즈의 제임스 고슬링(James Gosling)과 다른 연구원들이 개발한 객체 지향적 프로그래밍 언어이다.' has='객체지향 구조를 이해하고 활용이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94_(%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D_%EC%96%B8%EC%96%B4)' />
                            <Icon name='Spring Boot' url='/springboot.png' color='#6CB33E' description='최소한의 노력으로 독립 실행형 프로덕션 등급 Spring 기반 애플리케이션을 프로그래밍하는 데 사용되는 오픈 소스 Java 프레임워크이다.' has='JPA와 QueryDSL 및 RestAPI 구성이 가능합니다.' link='https://en.wikipedia.org/wiki/Spring_Boot' />
                            <Icon name='MySQL' url='/mysql.png' color='#00818a' description='세계에서 가장 많이 쓰이는 오픈 소스의 관계형 데이터베이스 관리 시스템으로 다중 스레드, 다중 사용자, 구조질의어 형식의 데이터베이스 관리 시스템으로 오라클이 관리 및 지원하고 있다.' has='ERD작성과 CRUD 활용이 가능합니다.' link='https://ko.wikipedia.org/wiki/MySQL' />
                            <Icon name='Ubuntu' url='/ubuntu.png' color='#DE4814' description='영국 기업 캐노니컬이 개발, 배포하는 컴퓨터 운영 체제이다. 데비안 리눅스를 기반으로 개발되며, 데비안에 비해 사용자 편의성에 초점을 맞춘 리눅스 배포판이다.' has='배포를 위한 환경 구축이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EC%9A%B0%EB%B6%84%ED%88%AC' />
                            <Icon name='기계학습' url='/machine_learning.png' color='#ff94d5' description='컴퓨터 시스템이 패턴과 추론에 의존하여 명시적 지시 없이 태스크를 수행하는 데 사용하는 알고리즘과 통계 모델을 개발하는 과학이다.' has='핵심 모델을 활용한 이미지처리와 추천 시스템 구현이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EA%B8%B0%EA%B3%84_%ED%95%99%EC%8A%B5' />
                            <Icon name='Python' url='/python.png' color='#3771A1' description='1991년 네덜란드계 소프트웨어 엔지니어인 귀도 반 로섬이 발표한 고급 프로그래밍 언어로, 인터프리터를 사용하는 객체지향 언어이자 플랫폼에 독립적인, 동적 타이핑 대화형 언어이다.' has='인터프리터 방식을 이해하고 프로젝트 수행이 가능합니다' link='https://ko.wikipedia.org/wiki/%ED%8C%8C%EC%9D%B4%EC%8D%AC' />
                            <Icon name='Git' url='/git.png' color='#f05033' description='컴퓨터 파일의 변경사항을 추적하고 여러 명의 사용자들 간에 해당 파일들의 작업을 조율하기 위한 스냅샷 스트림 기반의 분산 버전 관리 시스템이다.' has='Github Action과 협업을 위한 PR 사용이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EA%B9%83_(%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4)' />
                        </div>
                    </div>
                </div>
            case 2:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >데이터 정제</div>
                    <div className="flex h-[70%] w-full flex-col">
                        <a href="https://www.foodsafetykorea.go.kr/fcdb/index.do" className="cursor-pointer hover:underline hover:text-blue-400">
                            <label className="peer hover:underline hover:text-blue-400 cursor-pointer">식품의약품 안전처 식품영양성분 DB 통합본</label>
                            <img className="peer" src="/ingredients.png" />
                            <div className="absolute peer-hover:text-black hover:text-black w-full -translate-y-1/2 top-[50%] -translate-x-1/2 left-[50%] hover:opacity-100 peer-hover:opacity-100 opacity-0 bg-white p-4 flex justify-center flex flex-col border-2 rounded-lg">
                                <label className="self-center text-xl font-bold mt-2">SVD란?</label>
                                <label>특잇값 분해는 행렬을 특정한 구조로 분해하는 방식으로, 신호 처리와 통계학 등의 분야에서 자주 사용됩니다.</label>
                                <label className="self-center text-xl font-bold mt-2">작동 방식</label>
                                <label>사용자 요인 벡터와 아이템 요인 벡터로 사용자/아이템별 평점 행렬의 요인 벡터로 분리</label>
                                <label>평점 없는 아이템의 평점을 예측하여 가장 높은 순부터 추천</label>
                            </div>
                        </a>
                    </div>
                </div>
            case 3:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >SVD(Singular Value Decomposition)</div>
                    <div className="flex h-[70%] w-full flex-col relative">
                        <img src="/svd.png" className="cursor-pointer peer" alt="software" />
                        <div className="absolute w-full -translate-y-1/2 top-[50%] -translate-x-1/2 left-[50%] hover:opacity-100 peer-hover:opacity-100 opacity-0 bg-white p-4 flex justify-center flex flex-col border-2 rounded-lg">
                            <label className="self-center text-xl font-bold mt-2">SVD란?</label>
                            <label>특잇값 분해는 행렬을 특정한 구조로 분해하는 방식으로, 신호 처리와 통계학 등의 분야에서 자주 사용됩니다.</label>
                            <label className="self-center text-xl font-bold mt-2">작동 방식</label>
                            <label>사용자 요인 벡터와 아이템 요인 벡터로 사용자/아이템별 평점 행렬의 요인 벡터로 분리</label>
                            <label>평점 없는 아이템의 평점을 예측하여 가장 높은 순부터 추천</label>
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