# import requests
# import psycopg2

# conn = psycopg2.connect(
#     dbname="poke_db",
#     user="postgres",
#     password="your_pw",
#     host="localhost",
#     port="5432"
# )
# cur = conn.cursor()

# # 포켓몬 1~151까지
# for i in range(1, 1302):
#     url = f"https://pokeapi.co/api/v2/pokemon/{i}"
#     res = requests.get(url)
#     data = res.json()

#     name = data["name"]
#     height = data["height"]
#     weight = data["weight"]
#     base_exp = data["base_experience"]
#     sprite = data["sprites"]["front_default"]

#     cur.execute("""
#         INSERT INTO pokemon (name, height, weight, base_experience, sprite_url)
#         VALUES (%s, %s, %s, %s, %s)
#     """, (name, height, weight, base_exp, sprite))

# conn.commit()
# cur.close()
# conn.close()
