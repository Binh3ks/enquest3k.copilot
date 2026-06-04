#!/usr/bin/env python3
"""
Layer 3.5: Datamuse API helper + structured source loaders.

Goals:
- Query Datamuse collocation-style endpoints for a headword
- Load CSV idioms and JSON phrasal verbs from direct URLs
- Provide lightweight offline cache in production_kit/data/cache/

This does NOT depend on paid APIs.
"""

from __future__ import annotations

import csv
import json
import pathlib
import time
from typing import Any

import requests

ROOT = pathlib.Path(__file__).resolve().parents[2]
CACHE_DIR = ROOT / "production_kit" / "data" / "cache"
CACHE_DIR.mkdir(parents=True, exist_ok=True)

DATAMUSE_BASE = "https://api.datamuse.com/words"


def _cache_path(name: str) -> pathlib.Path:
    safe = name.replace("/", "_")
    return CACHE_DIR / safe


def fetch_json(url: str, cache_name: str, ttl_seconds: int = 86400) -> list[dict[str, Any]] | dict[str, Any]:
    path = _cache_path(cache_name)
    if path.exists() and time.time() - path.stat().st_mtime < ttl_seconds:
        return json.loads(path.read_text())
    r = requests.get(url, timeout=30)
    r.raise_for_status()
    data = r.json()
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2))
    return data


def fetch_text(url: str, cache_name: str, ttl_seconds: int = 86400) -> str:
    path = _cache_path(cache_name)
    if path.exists() and time.time() - path.stat().st_mtime < ttl_seconds:
        return path.read_text()
    r = requests.get(url, timeout=30)
    r.raise_for_status()
    text = r.text
    path.write_text(text)
    return text


def datamuse_predecessors(noun: str, max_results: int = 20) -> list[str]:
    """Words that commonly appear before noun: heavy rain, strong tea, etc."""
    url = f"{DATAMUSE_BASE}?rel_jjb={noun}&max={max_results}"
    data = fetch_json(url, f"datamuse_rel_jjb_{noun}.json")
    return [f"{item['word']} {noun}" for item in data if 'word' in item]


def datamuse_successors(adj: str, max_results: int = 20) -> list[str]:
    """Words that commonly appear after adjective: strong tea, strong wind, etc."""
    url = f"{DATAMUSE_BASE}?rel_jja={adj}&max={max_results}"
    data = fetch_json(url, f"datamuse_rel_jja_{adj}.json")
    return [f"{adj} {item['word']}" for item in data if 'word' in item]


def datamuse_triggers(word: str, max_results: int = 20) -> list[str]:
    """Words that are strongly associated with the headword."""
    url = f"{DATAMUSE_BASE}?ml={word}&max={max_results}"
    data = fetch_json(url, f"datamuse_ml_{word}.json")
    return [item['word'] for item in data if 'word' in item]


def load_idioms_csv(url: str) -> list[dict[str, str]]:
    """Load idioms from a direct CSV URL with columns like phrase, meaning."""
    text = fetch_text(url, "remote_idioms.csv")
    reader = csv.DictReader(text.splitlines())
    return list(reader)


def load_phrasal_verbs_json(url: str) -> list[dict[str, Any]]:
    """Load phrasal verbs from a direct JSON URL."""
    data = fetch_json(url, "remote_phrasal_verbs.json")
    if isinstance(data, dict):
        # normalize to list if API returns object
        return list(data.values())
    return data


def demo():
    print("Datamuse demo for noun='traffic':")
    print(datamuse_predecessors("traffic", 10))
    print()
    print("Datamuse demo for adj='heavy':")
    print(datamuse_successors("heavy", 10))
    print()
    print("Datamuse associations for 'collocation':")
    print(datamuse_triggers("collocation", 10))


if __name__ == "__main__":
    demo()
