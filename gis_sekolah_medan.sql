--
-- PostgreSQL database dump
--

\restrict XSu89xYFhde6V44OoziMSDgg2ZwmgHFSOFX9gzvtGL63uD54YgJYP1OsZfamKTz

-- Dumped from database version 17.9
-- Dumped by pg_dump version 17.9

-- Started on 2026-05-29 11:34:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 25280)
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- TOC entry 5938 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 25165)
-- Name: akreditasi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.akreditasi (
    akreditasi_id integer NOT NULL,
    nama_akreditasi character varying(30) NOT NULL
);


ALTER TABLE public.akreditasi OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 25164)
-- Name: akreditasi_akreditasi_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.akreditasi_akreditasi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.akreditasi_akreditasi_id_seq OWNER TO postgres;

--
-- TOC entry 5939 (class 0 OID 0)
-- Dependencies: 222
-- Name: akreditasi_akreditasi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.akreditasi_akreditasi_id_seq OWNED BY public.akreditasi.akreditasi_id;


--
-- TOC entry 233 (class 1259 OID 25256)
-- Name: ekskul; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ekskul (
    ekskul_id integer NOT NULL,
    nama_ekskul character varying(50) NOT NULL
);


ALTER TABLE public.ekskul OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 25255)
-- Name: ekskul_ekskul_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ekskul_ekskul_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ekskul_ekskul_id_seq OWNER TO postgres;

--
-- TOC entry 5940 (class 0 OID 0)
-- Dependencies: 232
-- Name: ekskul_ekskul_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ekskul_ekskul_id_seq OWNED BY public.ekskul.ekskul_id;


--
-- TOC entry 231 (class 1259 OID 25239)
-- Name: fasilitas_sekolah; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fasilitas_sekolah (
    sekolah_id integer NOT NULL,
    has_lab_komputer boolean DEFAULT false,
    has_perpustakaan boolean DEFAULT false,
    has_lapangan boolean DEFAULT false,
    has_lab_ipa boolean DEFAULT false,
    has_musholla boolean DEFAULT false,
    has_kantin boolean DEFAULT false
);


ALTER TABLE public.fasilitas_sekolah OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 25147)
-- Name: jenjang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jenjang (
    jenjang_id integer NOT NULL,
    nama_jenjang character varying(10) NOT NULL
);


ALTER TABLE public.jenjang OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 25146)
-- Name: jenjang_jenjang_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jenjang_jenjang_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jenjang_jenjang_id_seq OWNER TO postgres;

--
-- TOC entry 5941 (class 0 OID 0)
-- Dependencies: 218
-- Name: jenjang_jenjang_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jenjang_jenjang_id_seq OWNED BY public.jenjang.jenjang_id;


--
-- TOC entry 227 (class 1259 OID 25183)
-- Name: kecamatan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kecamatan (
    kecamatan_id integer NOT NULL,
    nama_kecamatan character varying(50) NOT NULL
);


ALTER TABLE public.kecamatan OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 25182)
-- Name: kecamatan_kecamatan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kecamatan_kecamatan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.kecamatan_kecamatan_id_seq OWNER TO postgres;

--
-- TOC entry 5942 (class 0 OID 0)
-- Dependencies: 226
-- Name: kecamatan_kecamatan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kecamatan_kecamatan_id_seq OWNED BY public.kecamatan.kecamatan_id;


--
-- TOC entry 225 (class 1259 OID 25174)
-- Name: kurikulum; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kurikulum (
    kurikulum_id integer NOT NULL,
    nama_kurikulum character varying(30) NOT NULL
);


ALTER TABLE public.kurikulum OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 25173)
-- Name: kurikulum_kurikulum_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kurikulum_kurikulum_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.kurikulum_kurikulum_id_seq OWNER TO postgres;

--
-- TOC entry 5943 (class 0 OID 0)
-- Dependencies: 224
-- Name: kurikulum_kurikulum_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kurikulum_kurikulum_id_seq OWNED BY public.kurikulum.kurikulum_id;


--
-- TOC entry 230 (class 1259 OID 25200)
-- Name: sekolah; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sekolah (
    sekolah_id integer NOT NULL,
    nama_sekolah character varying(255) NOT NULL,
    npsn bigint NOT NULL,
    jenjang_id integer NOT NULL,
    status_id integer NOT NULL,
    akreditasi_id integer NOT NULL,
    jumlah_siswa integer,
    alamat text,
    kecamatan_id integer NOT NULL,
    lokasi_lat numeric(10,6),
    lokasi_lng numeric(10,6),
    foto_url text,
    jumlah_guru numeric(5,1),
    kurikulum_id integer NOT NULL,
    spp_id integer NOT NULL,
    jam_operasional character varying(20)
);


ALTER TABLE public.sekolah OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 25264)
-- Name: sekolah_ekskul; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sekolah_ekskul (
    sekolah_id integer NOT NULL,
    ekskul_id integer NOT NULL
);


ALTER TABLE public.sekolah_ekskul OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 25192)
-- Name: spp_kategori; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.spp_kategori (
    spp_id integer NOT NULL,
    keterangan character varying(50) NOT NULL,
    spp_min numeric(10,0),
    spp_max numeric(10,0)
);


ALTER TABLE public.spp_kategori OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 25191)
-- Name: spp_kategori_spp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.spp_kategori_spp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.spp_kategori_spp_id_seq OWNER TO postgres;

--
-- TOC entry 5944 (class 0 OID 0)
-- Dependencies: 228
-- Name: spp_kategori_spp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.spp_kategori_spp_id_seq OWNED BY public.spp_kategori.spp_id;


--
-- TOC entry 221 (class 1259 OID 25156)
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    status_id integer NOT NULL,
    nama_status character varying(10) NOT NULL
);


ALTER TABLE public.status OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 25155)
-- Name: status_status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.status_status_id_seq OWNER TO postgres;

--
-- TOC entry 5945 (class 0 OID 0)
-- Dependencies: 220
-- Name: status_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_status_id_seq OWNED BY public.status.status_id;


--
-- TOC entry 241 (class 1259 OID 27772)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 27771)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5946 (class 0 OID 0)
-- Dependencies: 240
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 5699 (class 2604 OID 25168)
-- Name: akreditasi akreditasi_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.akreditasi ALTER COLUMN akreditasi_id SET DEFAULT nextval('public.akreditasi_akreditasi_id_seq'::regclass);


--
-- TOC entry 5709 (class 2604 OID 25259)
-- Name: ekskul ekskul_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ekskul ALTER COLUMN ekskul_id SET DEFAULT nextval('public.ekskul_ekskul_id_seq'::regclass);


--
-- TOC entry 5697 (class 2604 OID 25150)
-- Name: jenjang jenjang_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jenjang ALTER COLUMN jenjang_id SET DEFAULT nextval('public.jenjang_jenjang_id_seq'::regclass);


--
-- TOC entry 5701 (class 2604 OID 25186)
-- Name: kecamatan kecamatan_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kecamatan ALTER COLUMN kecamatan_id SET DEFAULT nextval('public.kecamatan_kecamatan_id_seq'::regclass);


--
-- TOC entry 5700 (class 2604 OID 25177)
-- Name: kurikulum kurikulum_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kurikulum ALTER COLUMN kurikulum_id SET DEFAULT nextval('public.kurikulum_kurikulum_id_seq'::regclass);


--
-- TOC entry 5702 (class 2604 OID 25195)
-- Name: spp_kategori spp_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spp_kategori ALTER COLUMN spp_id SET DEFAULT nextval('public.spp_kategori_spp_id_seq'::regclass);


--
-- TOC entry 5698 (class 2604 OID 25159)
-- Name: status status_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status ALTER COLUMN status_id SET DEFAULT nextval('public.status_status_id_seq'::regclass);


--
-- TOC entry 5710 (class 2604 OID 27775)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5919 (class 0 OID 25165)
-- Dependencies: 223
-- Data for Name: akreditasi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.akreditasi (akreditasi_id, nama_akreditasi) FROM stdin;
1	A
2	B
3	Belum Terakreditasi
\.


--
-- TOC entry 5929 (class 0 OID 25256)
-- Dependencies: 233
-- Data for Name: ekskul; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ekskul (ekskul_id, nama_ekskul) FROM stdin;
1	Pramuka
2	OSIS
3	Seni
4	Olahraga
5	Basket
6	Futsal
7	PMR
8	Paduan Suara
9	English Club
10	Terapi
11	Olahraga Adaptif
\.


--
-- TOC entry 5927 (class 0 OID 25239)
-- Dependencies: 231
-- Data for Name: fasilitas_sekolah; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fasilitas_sekolah (sekolah_id, has_lab_komputer, has_perpustakaan, has_lapangan, has_lab_ipa, has_musholla, has_kantin) FROM stdin;
1	t	t	f	f	t	f
2	f	f	f	f	t	f
3	f	f	f	f	t	f
4	f	f	f	f	t	f
5	t	f	f	f	t	f
6	f	f	f	f	t	f
7	f	f	f	f	t	f
8	f	t	t	f	t	t
9	f	t	t	f	t	t
10	t	t	f	f	t	f
11	t	t	t	f	t	t
12	f	f	f	f	t	f
13	t	t	t	f	t	t
14	t	t	f	f	t	f
15	f	f	f	f	t	f
16	f	f	f	f	t	f
17	t	f	f	f	t	f
18	t	t	f	f	t	f
19	t	t	f	f	f	f
20	t	t	f	f	f	f
21	t	t	f	f	t	f
22	t	t	f	f	f	f
23	t	t	f	f	f	f
24	t	t	f	f	f	f
25	f	t	t	f	f	t
26	f	t	f	f	f	f
27	t	t	t	f	f	t
28	t	t	t	f	t	t
29	f	t	t	f	f	t
30	t	t	f	f	f	f
31	t	t	f	f	f	f
32	t	f	f	f	f	f
33	f	f	f	f	f	f
34	t	t	t	f	f	t
35	t	t	t	f	f	t
36	t	t	t	f	f	t
37	f	f	f	f	t	f
38	t	t	t	t	t	t
39	t	t	t	t	t	t
40	t	t	t	t	t	t
41	t	t	t	t	t	t
42	t	t	t	t	t	t
43	t	t	t	t	f	t
44	t	t	t	t	f	t
45	t	t	t	t	f	t
46	t	t	t	t	f	t
47	t	t	t	t	f	t
48	t	t	t	t	t	t
49	t	t	t	t	t	t
50	t	t	t	t	f	t
51	t	t	t	t	f	t
52	f	f	t	t	f	t
53	t	t	t	t	f	t
54	t	t	t	t	f	t
55	t	t	t	t	t	t
56	t	t	t	t	f	t
57	t	t	t	t	f	t
58	t	t	t	t	f	t
59	t	f	t	t	t	t
60	t	t	t	t	f	t
61	t	t	t	t	f	t
62	t	t	t	t	f	t
63	t	t	t	t	t	t
64	t	t	t	t	t	t
65	t	t	t	t	t	t
66	t	t	t	t	t	t
67	t	t	t	t	t	t
68	t	t	t	t	f	t
69	t	t	t	t	f	t
70	t	t	t	t	t	t
71	t	t	t	t	f	t
72	t	t	t	t	f	t
73	t	t	t	t	f	t
74	t	t	t	t	f	t
75	t	t	t	t	f	t
76	t	t	t	t	f	t
77	t	t	t	t	f	t
78	t	t	t	t	f	t
79	t	t	t	t	f	t
80	t	t	t	t	t	t
81	t	t	t	t	f	t
82	t	t	t	t	f	t
83	t	t	t	t	f	t
84	t	t	t	t	f	t
85	t	t	t	t	t	t
86	t	t	t	t	f	t
87	t	t	t	t	t	t
88	t	t	t	t	f	t
89	t	t	t	t	f	t
90	t	t	t	t	f	t
91	t	t	t	t	f	t
92	t	t	t	t	f	t
93	t	t	t	t	t	t
94	t	t	t	t	f	t
95	t	t	t	t	f	t
96	t	t	t	t	f	t
97	t	t	t	t	f	t
98	t	t	f	f	f	f
99	f	f	f	f	f	f
\.


--
-- TOC entry 5915 (class 0 OID 25147)
-- Dependencies: 219
-- Data for Name: jenjang; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jenjang (jenjang_id, nama_jenjang) FROM stdin;
1	SD
2	SMP
3	SMA
4	SMK
5	SLB
\.


--
-- TOC entry 5923 (class 0 OID 25183)
-- Dependencies: 227
-- Data for Name: kecamatan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kecamatan (kecamatan_id, nama_kecamatan) FROM stdin;
1	Medan Kota
\.


--
-- TOC entry 5921 (class 0 OID 25174)
-- Dependencies: 225
-- Data for Name: kurikulum; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kurikulum (kurikulum_id, nama_kurikulum) FROM stdin;
1	Merdeka
\.


--
-- TOC entry 5926 (class 0 OID 25200)
-- Dependencies: 230
-- Data for Name: sekolah; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sekolah (sekolah_id, nama_sekolah, npsn, jenjang_id, status_id, akreditasi_id, jumlah_siswa, alamat, kecamatan_id, lokasi_lat, lokasi_lng, foto_url, jumlah_guru, kurikulum_id, spp_id, jam_operasional) FROM stdin;
68	SMA Swasta IT Indah	69986492	3	2	2	38	Jl. Jaya II No.32, Sudirejo II, Kec. Medan Kota, Kota Medan, Sumatera Utara 20226	1	3.596600	98.684700	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779109531/60042695514-img_20200203_225746_a6r2zd.jpg	7.0	1	5	Pagi
71	SMAS DWIWARNA	10210706	3	2	2	79		1	3.595500	98.686400	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779108937/03_hrrxcs.jpg	10.0	1	5	Pagi
73	SMAS HANG KESTURI	10210714	3	2	2	152	Jl. Sutomo No.144 A, Mesjid, Kec. Medan Kota, Kota Medan, Sumatera Utara 20211	1	3.587400	98.689800	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779108938/5d64acadbefb6_pn6pdm.jpg	2.0	1	5	Pagi
81	SMAS WIDIASANA UTAMA	10210830	3	2	2	30	Jl. Yoserizal No. 3 A, Sei Rengas I, Kec. Medan Kota, Kota Medan, Sumatera Utara.	1	3.594200	98.685700	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779108462/download_vcjf5x.jpg	6.0	1	5	Pagi
82	SMAS WIYATA DHARMA	10210918	3	2	1	304	Jl. Wahidin No.31, Pandau Hulu I, Kec. Medan Kota, Kota Medan, Sumatera Utara 20233	1	3.588600	98.687500	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779108462/download_vcjf5x.jpg	19.0	1	8	Pagi
83	SMAS WR SUPRATMAN 1	10210829	3	2	1	288	Jl. Asia No.143, Sei Rengas I, Kec. Medan Kota, Kota Medan, Sumatera Utara 20214	1	3.584500	98.691000	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779108484/acu_zph1gd.jpg	16.0	1	8	Pagi
84	SMAS YPK MEDAN	10210868	3	2	1	368	Jl. Sakti Lubis Gg Amal. 25, Jl. Sakti Lubis Gg. Pegawai No.8, Siti Rejo I, Kec. Medan Kota, Kota Medan, Sumatera Utara 20219	1	3.596300	98.686100	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779107472/images_orsgfb.jpg	21.0	1	8	Pagi
85	SMKN 1 MEDAN	10210976	4	1	1	1193	Jl. Sindoro No.1, Pusat Ps., Kec. Medan Kota, Kota Medan, Sumatera Utara 20211	1	3.586200	98.685000	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779108291/miris-nunggak-uang-sekolah-siswi-smk-negeri-1-medan-tak-diizinkan-ikuti-ujian-semester_b55Nt63Q72_udeyii.jpg	72.0	1	1	Pagi
86	SMK SWASTA ADVENT	69919141	4	2	2	35	Jl. Air Bersih No. 98A, Sudi Rejo I, Kec. Medan Kota, Kota Medan, Sumatera Utara.	1	3.607400	98.682900	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779108143/images_3_kn0jzm.jpg.jpg	3.0	1	5	Pagi
87	SMKS AL WASHLIYAH TELADAN	10260208	4	2	2	19	Jl. Garu II A No.2, Harjosari I, Kec. Medan Amplas, Kota Medan, Sumatera Utara 20217	1	3.595700	98.686300	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779108100/images_2_bkzt28.jpg	3.0	1	5	Pagi
89	SMKS ERIA	10211245	4	2	2	174	Jl. Sisingamangaraja No.195, RW.02, Teladan Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.591800	98.683600	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779107998/IMG_20170405_140811_wtutgi.jpg	13.0	1	8	Pagi
90	SMKS INDONESIA MEMBANGUN 1	10211211	4	2	1	560	Jl. Air Bersih No.59, Sudirejo I, Kec. Medan Kota, Kota Medan, Sumatera Utara 2022	1	3.604600	98.683900	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779107997/10211211-3_yjzzxw.jpg	21.0	1	5	Pagi
91	SMKS INDONESIA MEMBANGUN 2	10211225	4	2	2	169	Jl. Air Bersih No. 59, Sudirejo I, Kec. Medan Kota, Kota Medan, Sumatera Utara.	1	3.604800	98.684000	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779107996/7312556-smk-par-indonesia-membangun-3-medan_mzlklm.jpg	12.0	1	5	Pagi
93	SMKS MMA UISU	10211203	4	2	2	49	Jl. H. Bahrum Jamil No.2, Teladan Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.592200	98.683200	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779107824/images_1_hjcfox.jpg	7.0	1	5	Pagi
94	SMKS PARULIAN 1	10211262	4	2	2	202	Jl. Stadion Teladan Jl. Jati I No.23, Teladan Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.595400	98.686200	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779107653/smk_penerbangan_tertua_di_kota_medan_wakasek_kita_jemput_bola_zb4zkt.webp	14.0	1	5	Pagi
95	SMKS PENERBANGAN ANGKASA MEDAN	10258861	4	2	2	62	Jl. Turi Ujung Jl. Bahrun Jamil No.94, Binjai, Kec. Medan Denai, Kota Medan, Sumatera Utara 20226	1	3.589500	98.690300	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779107500/maxresdefault_ruzwsi.jpg	12.0	1	5	Pagi
80	SMAS UISU MEDAN	10210828	3	2	2	207	Jl. H. Bahrum Jamil No.2, Teladan Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.592000	98.683000		14.0	1	5	Pagi
88	SMKS DWIWARNA	10211090	4	2	1	787	Jl. Gedung Arca No.52, Teladan Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20217	1	3.595700	98.686500		42.0	1	5	Pagi
92	SMKS INDONESIA MEMBANGUN 3	10259159	4	2	2	214		1	3.594400	98.685800		12.0	1	5	Pagi
1	UPT SD NEGERI 060801	10209909	1	1	2	118	Jl. M.H Thamrin No.52, Pusat Ps., Kec. Medan Kota, Kota Medan, Sumatera Utara 20212	1	3.587700	98.683300	https://res.cloudinary.com/dkvdqu5lx/image/upload/v1778862005/UPT_SD_NEGERI_060801_dqcy61.jpg	8.0	1	1	Pagi
3	UPT SD NEGERI 060809	10259192	1	1	2	193	Jl. Halat No.48, Ps. Merah Bar., Kec. Medan Area, Kota Medan, Sumatera Utara 20216	1	3.600800	98.687100	https://res.cloudinary.com/dkvdqu5lx/image/upload/v1778862441/UPT_SD_NEGERI_060809_byiirj.jpg	9.0	1	1	Pagi
18	SD ISLAM TERPADU AL-ITTIHADIYAH TELADAN	69984125	1	2	2	58	Jl. Gedung Arca No.50, RT.02, Teladan Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.595500	98.686200	https://res.cloudinary.com/dkvdqu5lx/image/upload/v1778862737/SD_ISLAM_TERPADU_AL-ITTIHADIYAH_TELADAN_xexnzc.jpg	0.0	1	3	Pagi
19	SD SWASTA ADVENT 6 AIR BERSIH	69896416	1	2	2	94	Jl. Air Bersih Ujung No.98 A, Sudirejo II, Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.607000	98.682500	https://res.cloudinary.com/dkvdqu5lx/image/upload/v1778863104/SD_SWASTA_ADVENT_6_AIR_BERSIH_aal82l.jpg	6.0	1	3	Pagi
2	UPT SD NEGERI 060807	10210233	1	1	2	181	Jl. Halat No.48, Ps. Merah Bar., Kec. Medan Area, Kota Medan, Sumatera Utara 20216	1	3.600800	98.687100		9.0	1	1	Pagi
4	UPT SD NEGERI 060810	10209908	1	1	2	151	Jl.halat No 48, Kec. Medan Kota	1	3.600800	98.687200		9.0	1	1	Pagi
5	UPT SD NEGERI 060813	10209907	1	1	2	129	Jl. Halat Jl. Megawati No.48, Ps. Merah Bar., Kec. Medan Area, Kota Medan, Sumatera Utara 20216	1	3.600800	98.687300		9.0	1	1	Pagi
6	UPT SD NEGERI 060815	10209892	1	1	2	165	Jl. Halat Jl. Megawati No.48, Ps. Merah Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.600800	98.687400		8.0	1	1	Pagi
7	UPT SD NEGERI 060817	10210021	1	1	2	176		1	3.602500	98.679800		10.0	1	1	Pagi
8	UPT SD NEGERI 060819	10209984	1	1	2	268		1	3.605900	98.682100		16.0	1	1	Pagi
9	UPT SD NEGERI 060820	10209983	1	1	2	234	Jl. H. Bahrum Jamil No. 1C, Kelurahan Teladan Barat, Kecamatan Medan Kota, Kota Medan, Sumatera Utara.	1	3.603200	98.680500		13.0	1	1	Pagi
10	UPT SD NEGERI 060829	10209980	1	1	2	162	Jl. Saudara No.66a dan berada di Kota Medan Kec. Medan Kota	1	3.605500	98.681900		9.0	1	1	Pagi
11	UPT SD NEGERI 064029	10209796	1	1	1	365	Jl M Nawi Harahap No 141. Desa/Kelurahan, : SUDI REJO II. Kecamatan/Kota (LN), : KEC. MEDAN KOTA.	1	3.604800	98.681500		17.0	1	1	Pagi
12	UPT SD NEGERI 064030	10220702	1	1	2	193		1	3.595000	98.684500		11.0	1	1	Pagi
13	UPT SD NEGERI 064036	10209889	1	1	2	235	Jl. Turi Ujung Gg. Inpres, Kec. Medan Kota, Kota Medan, Prov. Sumatera Utara.	1	3.594000	98.685500		14.0	1	1	Pagi
14	UPT SD NEGERI 064956	10209872	1	1	2	104	HP74+73J, Gg. Inpres, Teladan Tim., Kec. Medan Kota, Kota Medan, Sumatera Utara 20217	1	3.594200	98.685600		8.0	1	1	Pagi
15	UPT SD NEGERI 066650	10210178	1	1	2	186	HP53+XXW, Jl. Santun Ujung, Sudirejo I, Kec. Medan Kota, Kota Medan, Sumatera Utara 20226	1	3.604800	98.683800		11.0	1	1	Pagi
16	UPT SD NEGERI 067090	10210192	1	1	2	142		1	3.601000	98.687200		10.0	1	1	Pagi
17	UPT SD NEGERI 067091	10210191	1	1	2	159	HP63+3C2, Sudirejo I, Medan Kota, Medan City, North Sumatra 20226	1	3.605000	98.683900		9.0	1	1	Pagi
21	SDS AL WASHLIYAH 09	10210356	1	2	2	84	Jl. Air Bersih, Gg. Rela, Komplek Mesjid Al Mukhlisin, Sudirejo I, Kota Medan	1	3.606500	98.682200		7.0	1	3	Pagi
22	SDS BERSUBSIDI WIDURI	10220707	1	2	2	90	Jl. Pelajar No.116A, Teladan Tim., Kec. Medan Kota, Kota Medan, Sumatera Utara 20226	1	3.599200	98.686200		9.0	1	3	Pagi
23	SDS BUDI MURNI 3	10210603	1	2	1	183	Jl. Merapi No.6b, Pusat Ps., Kec. Medan Kota, Kota Medan, Sumatera Utara 20212	1	3.587200	98.684100		9.0	1	6	Pagi
24	SDS ERIA	10210628	1	2	1	188	Jl. Sisingamangaraja No.195, RT.02, Teladan Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.591200	98.683200		12.0	1	6	Pagi
25	SDS GRACIA SUSTAIN	10220709	1	2	1	643	Jl. Turi Ujung No.139, Teladan Tim., Kec. Medan Kota, Kota Medan, Sumatera Utara 20226	1	3.594500	98.685100		25.0	1	6	Pagi
26	SDS HKBP TELADAN	10210633	1	2	2	98	Jl. Sempurna No.30, Teladan Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.596000	98.685800		7.0	1	3	Pagi
27	SDS METHODIST 2	10210683	1	2	1	964	Jalan MH Thamrin No.96 Pasar Baru, Pusat Ps., Kec. Medan Kota, Kota Medan, Sumatera Utara 20212	1	3.589100	98.689900		42.0	1	6	Pagi
28	SDS MUHAMMADIYAH 10	10210676	1	2	1	239	Sd Muhammadiyah 10 (Sudi Rejo I), Jl. H. Adenan Benawi No.66, Sudirejo I, Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.604200	98.683000		10.0	1	3	Pagi
29	SDS NASRANI 3	10257935	1	2	2	223	Gaharu, Medan Timur, Medan City, North Sumatra 20218	1	3.595500	98.684800		10.0	1	3	Pagi
30	SDS PARULIAN 1	10210658	1	2	2	108	Jl. Stadion Teladan Jl. Jati I No.23, Teladan Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.594800	98.686000		5.0	1	3	Pagi
31	SDS PARULIAN A	10220704	1	2	2	187	Jl. Turi Ujung No.165a, Sudirejo I, Kec. Medan Kota, Kota Medan, Sumatera Utara 20226	1	3.595200	98.684700		10.0	1	3	Pagi
32	SDS PARULIAN B	10210648	1	2	2	116	Jl. Jaya No.16, Sudirejo II, Kec. Medan Kota, Kota Medan, Sumatera Utara 20226	1	3.606200	98.681800		8.0	1	3	Pagi
33	SDS PRABHUDY PWKI SUMUT	10220708	1	2	2	68	Jl. Kemiri 1 No.1, Sudirejo II, Kec. Medan Kota, Kota Medan, Sumatera Utara 20218	1	3.605800	98.682000		8.0	1	3	Pagi
34	SDS ST. ANTONIUS V	10210508	1	2	1	709	Pahlawan, Medan Perjuangan, Medan City, North Sumatra 20217	1	3.597500	98.687800		23.0	1	6	Pagi
35	SDS WIYATA DHARMA	10210490	1	2	1	366	Jl. Wahidin No.31, Pandau Hulu I, Kec. Medan Kota, Kota Medan, Sumatera Utara 20233	1	3.588200	98.687200		21.0	1	6	Pagi
36	SDS WR SUPRATMAN 1	10210506	1	2	1	365		1	3.584000	98.690800		13.0	1	6	Pagi
20	SD SWASTA HANG KESTURI	10210619	1	2	1	122	Jl. Sutomo No.144 A, Mesjid, Kec. Medan Kota, Kota Medan, Sumatera Utara 20211	1	3.587000	98.689500	https://res.cloudinary.com/dkvdqu5lx/image/upload/v1778863428/SD_SWASTA_HANG_KESTURI_sedmae.jpg	14.0	1	3	Pagi
37	SDS ZENDING ISLAM	69875556	1	2	3	3	Jl. Sisingamangaraja No. 11 A, Kelurahan Teladan Barat, Kecamatan Medan Kota, Kota Medan, Sumatera Utara	1	3.590500	98.682000		2.0	1	3	Pagi
38	UPT SMP NEGERI 12 MEDAN	10210961	2	1	1	865	Jl. M.H Thamrin No.52, Pusat Ps., Kec. Medan Kota, Kota Medan, Sumatera Utara 20212	1	3.587700	98.683400		46.0	1	1	Pagi
39	UPT SMP NEGERI 3 MEDAN	10259233	2	1	1	1084	Jl. Pelajar No.69, Teladan Tim., Kec. Medan Kota, Kota Medan, Sumatera Utara 20226	1	3.599900	98.686200		62.0	1	1	Pagi
40	UPT SMP NEGERI 4 MEDAN	10210990	2	1	1	1044	Jl. Jati 3 No.118, Teladan Tim., Kec. Medan Kota, Kota Medan, Sumatera Utara 20217	1	3.598800	98.686000		64.0	1	1	Pagi
41	UPT SMP NEGERI 6 MEDAN	10210997	2	1	1	1089	Jl. Bahagia No.42, Teladan Tim., Kec. Medan Kota, Kota Medan, Sumatera Utara 20217	1	3.604000	98.681500		59.0	1	1	Pagi
42	UPT SMP NEGERI 8 MEDAN	10210984	2	1	1	938	Jl. Turi Ujung No.96, Sudirejo I, Kec. Medan Kota, Kota Medan, Sumatera Utara 20218	1	3.596200	98.684500		55.0	1	1	Pagi
43	SMP BUDI MURNI 3	10210060	2	2	1	216	Jl. Merapi No.2, Pusat Ps., Kec. Medan Kota, Kota Medan, Sumatera Utara 20212	1	3.587400	98.684300		12.0	1	7	Pagi
44	SMP DWIWARNA MEDAN	10210070	2	2	2	21	Jl. Gedung Arca No.52, Teladan Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.595200	98.686200		6.0	1	4	Pagi
45	SMP ERIA	10210067	2	2	1	176	Jl. Sisingamangaraja No.195, Teladan Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.591400	98.683400		12.0	1	7	Pagi
46	SMP HANG KESTURI	10210034	2	2	1	104	Jl. Sutomo No.144 A, Mesjid, Kec. Medan Kota, Kota Medan, Sumatera Utara 20211	1	3.587200	98.689700		10.0	1	4	Pagi
47	SMP INDONESIA MEMBANGUN	10210036	2	2	2	139	Jl. Air Bersih No. 59, Sudirejo I, Medan, Sumatera Utara	1	3.604200	98.683500		5.0	1	4	Pagi
48	SMP ISLAM TERPADU INDAH MEDAN	69980267	2	2	1	194	Jl. Jaya II No.32, Sudirejo II, Kec. Medan Kota, Kota Medan, Sumatera Utara 20226	1	3.596400	98.684700		8.0	1	4	Pagi
49	SMP MMA UISU MEDAN	10210219	2	2	2	91	Jl. Sisingamangaraja No.59, Teladan Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.591800	98.682800		7.0	1	4	Pagi
50	SMP PGRI 4 MEDAN	10211022	2	2	2	107	Jl. Turi Ujung No.96, Sudirejo I, Kec. Medan Tim., Kota Medan, Sumatera Utara 20218	1	3.599000	98.685800		13.0	1	4	Pagi
51	SMP SWASTA ADVENT AIR BERSIH MEDAN	69982289	2	2	2	37	Jl. Air Bersih Ujung No.98 A, Sudirejo II, Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.606800	98.682700		1.0	1	4	Pagi
52	SMP SWASTA METHODIST-2 MEDAN	10210136	2	2	1	1168	Jalan MH Thamrin No.96 Pasar Baru, Pusat Ps., Kec. Medan Kota, Kota Medan, Sumatera Utara 20212	1	3.589300	98.690100		23.0	1	7	Pagi
53	SMP SWASTA SUTOMO 1	10211031	2	2	1	2193	Jl. LetKol Martinus No.7, Pusat Ps., Kec. Medan Kota, Kota Medan, Sumatera Utara 20212	1	3.584200	98.691000		51.0	1	7	Pagi
54	SMP SWASTA WIYATA DHARMA	10211034	2	2	1	219	HMQW+84V, Jl. Wahidin, Hulu IKec, Kec. Medan Kota, Kota Medan, Sumatera Utara 20233	1	3.588400	98.687400		12.0	1	7	Pagi
55	SMP SWT AL WASHLIYAH 29	10210208	2	2	2	33	Jl. Stadion No.12, Teladan Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20217	1	3.595300	98.686300		3.0	1	4	Pagi
56	SMP SWT KATOLIK TRI SAKTI-I	10210077	2	2	1	477	Jl. HM. Joni No.52A, Teladan Tim., Kec. Medan Kota, Kota Medan, Sumatera Utara 20217	1	3.597700	98.688000		23.0	1	4	Pagi
57	SMP SWT NASRANI 5	10210083	2	2	1	292	Jl. Turi Ujung No.108, Sudirejo I, Kec. Medan Kota, Kota Medan, Sumatera Utara 20226	1	3.595700	98.685000		16.0	1	4	Pagi
58	SMP SWT PARULIAN 1	10210102	2	2	2	192	Jl. Stadion Teladan Jl. Jati I No.23, Teladan Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.595000	98.686200		8.0	1	4	Pagi
59	SMP TPI	10211048	2	2	2	51	l. Pelajar No.44, Teladan Tim., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.601000	98.687300		4.0	1	4	Pagi
60	SMP TUNAS GAJAH MADA	10257797	2	2	2	102	Jl. Tilak No.95/97, Sei Rengas I, Kec. Medan Kota, Kota Medan, Sumatera Utara 20214	1	3.582200	98.691800		9.0	1	4	Pagi
61	SMP WR SUPRATMAN 1 MEDAN	10211045	2	2	1	201	Jl. Asia No.143, Sei Rengas I, Kec. Medan Kota, Kota Medan, Sumatera Utara 20214	1	3.584300	98.690900		16.0	1	7	Pagi
62	SMP YPK	10211043	2	2	1	233	Jl. Taut No.76-90, Sidorejo, Kec. Medan Tembung, Kota Medan, Sumatera Utara 20222	1	3.596200	98.686000		12.0	1	7	Pagi
63	SMPS AL ITTIHADIYAH	10210202	2	2	2	196	Jl. Mamiyai No.1, Tegal Sari III, Kec. Medan Area, Kota Medan, Sumatera Utara 20227	1	3.599500	98.686500		5.0	1	4	Pagi
64	SMAN 10 MEDAN	10210874	3	1	1	614	Jl. Tilak No.108, Sei Rengas I, Kec. Medan Kota, Kota Medan, Sumatera Utara 20214	1	3.581900	98.691400		44.0	1	1	Pagi
65	SMAN 18 MEDAN	10210852	3	1	1	483	Jl. Wahidin No.55 C, Pandau Hulu I, Kec. Medan Kota, Kota Medan, Sumatera Utara 20211	1	3.588000	98.687000		42.0	1	1	Pagi
66	SMAN 5 MEDAN	10210858	3	1	1	1150	Jl. Pelajar No.17, Teladan Tim., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.599800	98.686100		93.0	1	1	Pagi
67	SMAN 6 MEDAN	10210859	3	1	1	606	Jl. Ansari No.34, Sei Rengas I, Kec. Medan Kota, Kota Medan, Sumatera Utara 20214	1	3.595800	98.684800		48.0	1	1	Pagi
69	SMAS ADVENT AIR BERSIH MEDAN	10210815	3	2	2	160	Jl. Air Bersih Ujung No.98 A, Sudirejo II, Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.607200	98.682700		8.0	1	5	Pagi
72	SMAS ERIA MEDAN	10210709	3	2	1	572	Jl. Sisingamangaraja No.195, RW.02, Teladan Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.591600	98.683500		30.0	1	8	Pagi
74	SMAS INDONESIA MEMBANGUN	10210751	3	2	2	322		1	3.604400	98.683700		12.0	1	5	Pagi
70	SMAS AL ITTIHADIYAH	10210817	3	2	2	141		1	3.599700	98.686600	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779109364/images_7_vrn9rd.jpg	2.0	1	5	Pagi
75	SMAS METHODIST 2 MEDAN	10210903	3	2	1	1784	Jalan MH Thamrin No.96 Pasar Baru, Pusat Ps., Kec. Medan Kota, Kota Medan, Sumatera Utara 20212	1	3.589300	98.690200	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779108709/images_6_hhpmuc.jpg	51.0	1	8	Pagi
96	SMKS TAMAN SISWA	10211061	4	2	1	399	Jl. Sabaruddin No.8, Sei Rengas Permata, Kec. Medan Area, Kota Medan, Sumatera Utara 20214	1	3.601200	98.687400		19.0	1	5	Pagi
76	SMAS NASRANI 3 MEDAN	10210821	3	2	2	59	JM2G+HF9, Gaharu, Medan Timur, Medan City, North Sumatra 20218	1	3.595900	98.684900	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779108710/3_avreel.webp	7.0	1	5	Pagi
77	SMAS PARULIAN 1	10210911	3	2	1	263	Jl. Stadion Teladan Jl. Jati I No.23, Teladan Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216	1	3.595200	98.686100	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779108711/2022-08-28_eqivzg.jpg	17.0	1	5	Pagi
78	SMAS SUTOMO 1	10210848	3	2	1	2949	Jl. LetKol Martinus No.7, Pusat Ps., Kec. Medan Kota, Kota Medan, Sumatera Utara 20212	1	3.584400	98.691100	https://res.cloudinary.com/dkvdqu5lx/image/upload/v1778834181/SMAS_SUTOMO_1_uy27dh.jpg	74.0	1	8	Pagi
79	SMAS TUNAS GAJAH MADA	10210827	3	2	2	139	Jl. Tilak No.95/97, Sei Rengas I, Kec. Medan Kota, Kota Medan, Sumatera Utara 20214	1	3.582400	98.691900	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779108594/images_5_np9frn.jpg	8.0	1	5	Pagi
97	SMKS YPK	10211087	4	2	1	513	Jl. Sakti Lubis Gg Amal. 25, Jl. Sakti Lubis Gg. Pegawai No.8, Siti Rejo I, Kec. Medan Kota, Kota Medan, Sumatera Utara 20219	1	3.596500	98.686200	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779107472/images_orsgfb.jpg	32.0	1	8	Pagi
98	SLB B KARYA MURNI	10259452	5	2	1	145	Jl. HM. Joni No.66 A, Teladan Tim., Kec. Medan Kota, Kota Medan, Sumatera Utara 20217	1	3.604500	98.684200	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779107173/slb_b_karya_murni_sekolah_tunarungu_tetap_menerima_siswa_dengan_kebutuhan_ganda_wrmhdr.jpg	18.0	1	2	Pagi
99	SLB TUNAGRAHITA SANTA LUSIA	10259518	5	2	2	137	Jl. Sindoro No.04, Pusat Ps., Kec. Medan Kota, Kota Medan, Sumatera Utara 20212	1	3.586000	98.684900	https://res.cloudinary.com/ddxdizmuv/image/upload/v1779107488/kekurangan_guru_kendala_slb_c_santa_lusia_medan_tingkatkan_kualitas_buznin.webp	13.0	1	2	Pagi
\.


--
-- TOC entry 5930 (class 0 OID 25264)
-- Dependencies: 234
-- Data for Name: sekolah_ekskul; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sekolah_ekskul (sekolah_id, ekskul_id) FROM stdin;
1	1
1	3
1	4
1	6
2	1
2	3
2	4
2	6
3	1
3	3
3	4
3	6
4	1
4	3
4	4
4	6
5	1
5	3
5	4
5	6
6	1
6	3
6	4
6	6
7	1
7	3
7	4
7	6
8	1
8	3
8	4
8	6
9	1
9	3
9	4
9	6
10	1
10	3
10	4
10	6
11	1
11	3
11	4
11	6
12	1
12	3
12	4
12	6
13	1
13	3
13	4
13	6
14	1
14	3
14	4
14	6
15	1
15	3
15	4
15	6
16	1
16	3
16	4
16	6
17	1
17	3
17	4
17	6
18	1
18	3
18	4
18	6
19	1
19	3
19	4
19	6
20	1
20	3
20	4
20	6
21	1
21	3
21	4
21	6
22	1
22	3
22	4
22	6
23	1
23	3
23	4
23	6
24	1
24	3
24	4
24	6
25	1
25	3
25	4
25	6
26	1
26	3
26	4
26	6
27	1
27	3
27	4
27	6
28	1
28	3
28	4
28	6
29	1
29	3
29	4
29	6
30	1
30	3
30	4
30	6
31	1
31	3
31	4
31	6
32	1
32	3
32	4
32	6
33	1
33	3
33	4
33	6
34	1
34	3
34	4
34	6
35	1
35	3
35	4
35	6
36	1
36	3
36	4
36	6
37	1
37	3
37	4
37	6
38	1
38	2
38	3
38	4
38	5
38	6
38	7
38	8
38	9
39	1
39	2
39	3
39	4
39	5
39	6
39	7
40	1
40	2
40	3
40	4
40	5
40	6
40	7
41	1
41	2
41	3
41	4
41	5
41	6
41	7
42	1
42	2
42	3
42	4
42	5
42	6
42	7
42	8
42	9
43	1
43	2
43	3
43	4
43	5
43	6
43	7
44	1
44	2
44	3
44	4
44	5
44	6
44	7
45	1
45	2
45	3
45	4
45	5
45	6
45	7
46	1
46	2
46	3
46	4
46	5
46	6
46	7
47	1
47	2
47	3
47	4
47	5
47	6
47	7
48	1
48	2
48	3
48	4
48	5
48	6
48	7
49	1
49	2
49	3
49	4
49	5
49	6
49	7
50	1
50	2
50	3
50	4
50	5
50	6
50	7
51	1
51	2
51	3
51	4
51	5
51	6
51	7
52	1
52	2
52	3
52	4
52	5
52	6
52	7
53	1
53	2
53	3
53	4
53	5
53	6
53	7
54	1
54	2
54	3
54	4
54	5
54	6
54	7
55	1
55	2
55	3
55	4
55	5
55	6
55	7
56	1
56	2
56	3
56	4
56	5
56	6
56	7
56	8
56	9
57	1
57	2
57	3
57	4
57	5
57	6
57	7
58	1
58	2
58	3
58	4
58	5
58	6
58	7
59	1
59	2
59	3
59	4
59	5
59	6
59	7
60	1
60	2
60	3
60	4
60	5
60	6
60	7
61	1
61	2
61	3
61	4
61	5
61	6
61	7
62	1
62	2
62	3
62	4
62	5
62	6
62	7
63	1
63	2
63	3
63	4
63	5
63	6
63	7
64	2
64	1
64	3
64	4
64	5
64	6
64	7
64	9
64	8
65	2
65	1
65	3
65	4
65	5
65	6
65	7
65	9
65	8
66	2
66	1
66	3
66	4
66	5
66	6
66	7
66	9
66	8
67	2
67	1
67	3
67	4
67	5
67	6
67	7
67	9
67	8
68	2
68	1
68	3
68	4
68	5
68	6
68	7
68	9
68	8
69	2
69	1
69	3
69	4
69	5
69	6
69	7
69	9
69	8
70	2
70	1
70	3
70	4
70	5
70	6
70	7
70	9
70	8
71	2
71	1
71	3
71	4
71	5
71	6
71	7
71	9
71	8
72	2
72	1
72	3
72	4
72	5
72	6
72	7
72	9
72	8
73	2
73	1
73	3
73	4
73	5
73	6
73	7
73	9
73	8
74	2
74	1
74	3
74	4
74	5
74	6
74	7
74	9
74	8
75	2
75	1
75	3
75	4
75	5
75	6
75	7
75	9
75	8
76	2
76	1
76	3
76	4
76	5
76	6
76	7
76	9
76	8
77	2
77	1
77	3
77	4
77	5
77	6
77	7
77	9
77	8
78	2
78	1
78	3
78	4
78	5
78	6
78	7
78	9
78	8
79	2
79	1
79	3
79	4
79	5
79	6
79	7
79	9
79	8
80	2
80	1
80	3
80	4
80	5
80	6
80	7
80	9
80	8
81	2
81	1
81	3
81	4
81	5
81	6
81	7
81	9
81	8
82	2
82	1
82	3
82	4
82	5
82	6
82	7
82	9
82	8
83	2
83	1
83	3
83	4
83	5
83	6
83	7
83	9
83	8
84	2
84	1
84	3
84	4
84	5
84	6
84	7
84	9
84	8
85	2
85	1
85	3
85	4
85	5
85	6
85	7
85	9
85	8
86	2
86	1
86	3
86	4
86	5
86	6
86	7
86	9
86	8
87	2
87	1
87	3
87	4
87	5
87	6
87	7
87	9
87	8
88	2
88	1
88	3
88	4
88	5
88	6
88	7
88	9
88	8
89	2
89	1
89	3
89	4
89	5
89	6
89	7
89	9
89	8
90	2
90	1
90	3
90	4
90	5
90	6
90	7
90	9
90	8
91	2
91	1
91	3
91	4
91	5
91	6
91	7
91	9
91	8
92	2
92	1
92	3
92	4
92	5
92	6
92	7
92	9
92	8
93	2
93	1
93	3
93	4
93	5
93	6
93	7
93	9
93	8
94	2
94	1
94	3
94	4
94	5
94	6
94	7
94	9
94	8
95	2
95	1
95	3
95	4
95	5
95	6
95	7
95	9
95	8
96	2
96	1
96	3
96	4
96	5
96	6
96	7
96	9
96	8
97	2
97	1
97	3
97	4
97	5
97	6
97	7
97	9
97	8
98	10
98	3
98	11
99	10
99	3
99	11
\.


--
-- TOC entry 5696 (class 0 OID 25602)
-- Dependencies: 236
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- TOC entry 5925 (class 0 OID 25192)
-- Dependencies: 229
-- Data for Name: spp_kategori; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spp_kategori (spp_id, keterangan, spp_min, spp_max) FROM stdin;
1	Gratis	\N	\N
2	Subsidi/Gratis	\N	\N
3	Rp 100.000 - 300.000/bln	100000	300000
4	Rp 150.000 - 350.000/bln	150000	350000
5	Rp 200.000 - 400.000/bln	200000	400000
6	Rp 300.000 - 500.000/bln	300000	500000
7	Rp 350.000 - 600.000/bln	350000	600000
8	Rp 400.000 - 700.000/bln	400000	700000
\.


--
-- TOC entry 5917 (class 0 OID 25156)
-- Dependencies: 221
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status (status_id, nama_status) FROM stdin;
1	Negeri
2	Swasta
\.


--
-- TOC entry 5932 (class 0 OID 27772)
-- Dependencies: 241
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, created_at) FROM stdin;
1	admin_samuel	$2b$10$udz1c82d1n9IfDsbO/XuGuLSs70Noe8VEInzrSHWgPVJWB0PnPx6C	2026-05-20 10:50:11.267977
\.


--
-- TOC entry 5947 (class 0 OID 0)
-- Dependencies: 222
-- Name: akreditasi_akreditasi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.akreditasi_akreditasi_id_seq', 3, true);


--
-- TOC entry 5948 (class 0 OID 0)
-- Dependencies: 232
-- Name: ekskul_ekskul_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ekskul_ekskul_id_seq', 11, true);


--
-- TOC entry 5949 (class 0 OID 0)
-- Dependencies: 218
-- Name: jenjang_jenjang_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jenjang_jenjang_id_seq', 5, true);


--
-- TOC entry 5950 (class 0 OID 0)
-- Dependencies: 226
-- Name: kecamatan_kecamatan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kecamatan_kecamatan_id_seq', 1, true);


--
-- TOC entry 5951 (class 0 OID 0)
-- Dependencies: 224
-- Name: kurikulum_kurikulum_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kurikulum_kurikulum_id_seq', 1, true);


--
-- TOC entry 5952 (class 0 OID 0)
-- Dependencies: 228
-- Name: spp_kategori_spp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.spp_kategori_spp_id_seq', 8, true);


--
-- TOC entry 5953 (class 0 OID 0)
-- Dependencies: 220
-- Name: status_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_status_id_seq', 2, true);


--
-- TOC entry 5954 (class 0 OID 0)
-- Dependencies: 240
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 5722 (class 2606 OID 25172)
-- Name: akreditasi akreditasi_nama_akreditasi_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.akreditasi
    ADD CONSTRAINT akreditasi_nama_akreditasi_key UNIQUE (nama_akreditasi);


--
-- TOC entry 5724 (class 2606 OID 25170)
-- Name: akreditasi akreditasi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.akreditasi
    ADD CONSTRAINT akreditasi_pkey PRIMARY KEY (akreditasi_id);


--
-- TOC entry 5744 (class 2606 OID 25263)
-- Name: ekskul ekskul_nama_ekskul_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ekskul
    ADD CONSTRAINT ekskul_nama_ekskul_key UNIQUE (nama_ekskul);


--
-- TOC entry 5746 (class 2606 OID 25261)
-- Name: ekskul ekskul_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ekskul
    ADD CONSTRAINT ekskul_pkey PRIMARY KEY (ekskul_id);


--
-- TOC entry 5742 (class 2606 OID 25249)
-- Name: fasilitas_sekolah fasilitas_sekolah_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fasilitas_sekolah
    ADD CONSTRAINT fasilitas_sekolah_pkey PRIMARY KEY (sekolah_id);


--
-- TOC entry 5714 (class 2606 OID 25154)
-- Name: jenjang jenjang_nama_jenjang_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jenjang
    ADD CONSTRAINT jenjang_nama_jenjang_key UNIQUE (nama_jenjang);


--
-- TOC entry 5716 (class 2606 OID 25152)
-- Name: jenjang jenjang_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jenjang
    ADD CONSTRAINT jenjang_pkey PRIMARY KEY (jenjang_id);


--
-- TOC entry 5730 (class 2606 OID 25190)
-- Name: kecamatan kecamatan_nama_kecamatan_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kecamatan
    ADD CONSTRAINT kecamatan_nama_kecamatan_key UNIQUE (nama_kecamatan);


--
-- TOC entry 5732 (class 2606 OID 25188)
-- Name: kecamatan kecamatan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kecamatan
    ADD CONSTRAINT kecamatan_pkey PRIMARY KEY (kecamatan_id);


--
-- TOC entry 5726 (class 2606 OID 25181)
-- Name: kurikulum kurikulum_nama_kurikulum_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kurikulum
    ADD CONSTRAINT kurikulum_nama_kurikulum_key UNIQUE (nama_kurikulum);


--
-- TOC entry 5728 (class 2606 OID 25179)
-- Name: kurikulum kurikulum_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kurikulum
    ADD CONSTRAINT kurikulum_pkey PRIMARY KEY (kurikulum_id);


--
-- TOC entry 5748 (class 2606 OID 25268)
-- Name: sekolah_ekskul sekolah_ekskul_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sekolah_ekskul
    ADD CONSTRAINT sekolah_ekskul_pkey PRIMARY KEY (sekolah_id, ekskul_id);


--
-- TOC entry 5738 (class 2606 OID 25208)
-- Name: sekolah sekolah_npsn_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sekolah
    ADD CONSTRAINT sekolah_npsn_key UNIQUE (npsn);


--
-- TOC entry 5740 (class 2606 OID 25206)
-- Name: sekolah sekolah_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sekolah
    ADD CONSTRAINT sekolah_pkey PRIMARY KEY (sekolah_id);


--
-- TOC entry 5734 (class 2606 OID 25199)
-- Name: spp_kategori spp_kategori_keterangan_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spp_kategori
    ADD CONSTRAINT spp_kategori_keterangan_key UNIQUE (keterangan);


--
-- TOC entry 5736 (class 2606 OID 25197)
-- Name: spp_kategori spp_kategori_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spp_kategori
    ADD CONSTRAINT spp_kategori_pkey PRIMARY KEY (spp_id);


--
-- TOC entry 5718 (class 2606 OID 25163)
-- Name: status status_nama_status_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_nama_status_key UNIQUE (nama_status);


--
-- TOC entry 5720 (class 2606 OID 25161)
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (status_id);


--
-- TOC entry 5752 (class 2606 OID 27778)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 5754 (class 2606 OID 27780)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 5761 (class 2606 OID 25250)
-- Name: fasilitas_sekolah fasilitas_sekolah_sekolah_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fasilitas_sekolah
    ADD CONSTRAINT fasilitas_sekolah_sekolah_id_fkey FOREIGN KEY (sekolah_id) REFERENCES public.sekolah(sekolah_id);


--
-- TOC entry 5755 (class 2606 OID 25219)
-- Name: sekolah sekolah_akreditasi_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sekolah
    ADD CONSTRAINT sekolah_akreditasi_id_fkey FOREIGN KEY (akreditasi_id) REFERENCES public.akreditasi(akreditasi_id);


--
-- TOC entry 5762 (class 2606 OID 25274)
-- Name: sekolah_ekskul sekolah_ekskul_ekskul_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sekolah_ekskul
    ADD CONSTRAINT sekolah_ekskul_ekskul_id_fkey FOREIGN KEY (ekskul_id) REFERENCES public.ekskul(ekskul_id);


--
-- TOC entry 5763 (class 2606 OID 25269)
-- Name: sekolah_ekskul sekolah_ekskul_sekolah_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sekolah_ekskul
    ADD CONSTRAINT sekolah_ekskul_sekolah_id_fkey FOREIGN KEY (sekolah_id) REFERENCES public.sekolah(sekolah_id);


--
-- TOC entry 5756 (class 2606 OID 25209)
-- Name: sekolah sekolah_jenjang_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sekolah
    ADD CONSTRAINT sekolah_jenjang_id_fkey FOREIGN KEY (jenjang_id) REFERENCES public.jenjang(jenjang_id);


--
-- TOC entry 5757 (class 2606 OID 25224)
-- Name: sekolah sekolah_kecamatan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sekolah
    ADD CONSTRAINT sekolah_kecamatan_id_fkey FOREIGN KEY (kecamatan_id) REFERENCES public.kecamatan(kecamatan_id);


--
-- TOC entry 5758 (class 2606 OID 25229)
-- Name: sekolah sekolah_kurikulum_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sekolah
    ADD CONSTRAINT sekolah_kurikulum_id_fkey FOREIGN KEY (kurikulum_id) REFERENCES public.kurikulum(kurikulum_id);


--
-- TOC entry 5759 (class 2606 OID 25234)
-- Name: sekolah sekolah_spp_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sekolah
    ADD CONSTRAINT sekolah_spp_id_fkey FOREIGN KEY (spp_id) REFERENCES public.spp_kategori(spp_id);


--
-- TOC entry 5760 (class 2606 OID 25214)
-- Name: sekolah sekolah_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sekolah
    ADD CONSTRAINT sekolah_status_id_fkey FOREIGN KEY (status_id) REFERENCES public.status(status_id);


-- Completed on 2026-05-29 11:34:53

--
-- PostgreSQL database dump complete
--

\unrestrict XSu89xYFhde6V44OoziMSDgg2ZwmgHFSOFX9gzvtGL63uD54YgJYP1OsZfamKTz

