---
layout: page
title: The Lot - Drum Corps Audition Search RAG Tool
description: python, fastapi, postgresql, pgvector, openai api
img: assets/img/publication_preview/thelot.png
importance: 1
category: swe
---

## Background

The Lot is a retrieval-augmented generation (RAG) tool that helps drum corps hopefuls search and make sense of Drum Corps International (DCI) audition materials — camp packets, music, drill, and staff communications — through natural, conversational queries instead of manually combing through scattered PDFs and web pages.

## Data & Retrieval

I designed a PostgreSQL schema (with the pgvector extension) to store and query source documents as embeddings, enabling low-latency semantic search over DCI corps materials. On top of that, I engineered a FastAPI ingestion service that processes and embeds source documents via the OpenAI API, exposing REST endpoints for indexing and retrieval.

## RAG Query Layer

I built the RAG query layer end to end: vector similarity retrieval over the embedded document store, dynamic prompt construction that injects the most relevant retrieved context, and profile-based responses tailored to the querying user's corps of interest and audition needs.
