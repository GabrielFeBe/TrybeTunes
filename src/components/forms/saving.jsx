<label htmlFor="login">

              Login
              <input
                type="text"
                id="login"
                value={ login }
                data-testid="login-name-input"
                onChange={ this.handleChange }
                name="login"
              />
            </label>

            <label htmlFor="email">
              Email
              <input
                id="email"
                type="text"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="description">
              Description
              <textarea
                type="text"
                name="description"
                value={ description }
                onChange={ this.handleChange }
                id="description"
              />
            </label>
            <label htmlFor="link">
              Image.jpg
              <input
                id="link"
                type="text"
                name="image"
                onChange={ this.handleChange }
                value={ image }
              />

            </label>